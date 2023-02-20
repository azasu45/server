import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as sharp from 'sharp';
import { Readable } from 'stream';
import {
  IMAGE_SIZE,
  MAX_WIDTH,
  QUALITY_ARRAY,
} from './constants/uploader.constant';
import { FileUploadDto } from './dtos/file-upload.dto';
import { RatioEnum } from './enums/ratio.enum';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IBucketData } from 'src/config/interfaces/bucket-data.interface';
import { createWriteStream } from 'fs';

@Injectable()
export class UploaderService {
  private readonly client: S3Client;
  private readonly bucketData: IBucketData;
  private readonly loggerService: LoggerService;

  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client(
      this.configService.get<S3ClientConfig>('uploader.clientConfig'),
    );
    this.bucketData = this.configService.get<IBucketData>(
      'uploader.bucketData',
    );
    this.loggerService = new Logger(UploaderService.name);
  }

  private static validateImage(mimetype: string): string | false {
    const val = mimetype.split('/');
    if (val[0] !== 'image') return false;

    return val[1] ?? false;
  }

  private static async streamToBuffer(
    stream: Readable,
    userId: string,
  ): Promise<boolean> {
    const buffer: Uint8Array[] = [];
    return new Promise(
      (resolve, reject) =>
        stream
          .pipe(
            createWriteStream(
              `./client/public/images/${
                userId ? `${userId}.png` : userId + '.jpg'
              }`,
            ),
          )
          .on('finish', () => resolve(true))
          .on('error', () => reject(false)),
      //.on('data', (data) => buffer.push(data))
      //.on('end', () => resolve(Buffer.concat(buffer)))
    );
  }

  private static async compressImage(
    buffer: Buffer,
    ratio?: number,
  ): Promise<Buffer> {
    let compressBuffer: sharp.Sharp | Buffer = sharp(buffer).jpeg({
      mozjpeg: true,
      chromaSubsampling: '4:4:4',
    });

    if (ratio) {
      compressBuffer.resize({
        width: MAX_WIDTH,
        height: Math.round(MAX_WIDTH * ratio),
        fit: 'cover',
      });
    }

    compressBuffer = await compressBuffer.toBuffer();

    if (compressBuffer.length > IMAGE_SIZE) {
      for (let i = 0; i < QUALITY_ARRAY.length; i++) {
        const quality = QUALITY_ARRAY[i];
        const smallerBuffer = await sharp(compressBuffer)
          .jpeg({
            quality,
            chromaSubsampling: '4:4:4',
          })
          .toBuffer();

        if (smallerBuffer.length <= IMAGE_SIZE || quality === 10) {
          compressBuffer = smallerBuffer;
          break;
        }
      }
    }

    return compressBuffer;
  }

  /**
   * Upload Image
   *
   * Converts an image to jpeg and uploads it to the bucket
   */
  public async uploadImage(
    userId: string,
    file: Promise<FileUploadDto>,
  ): Promise<boolean> {
    const { mimetype, createReadStream } = await file;
    const imageType = UploaderService.validateImage(mimetype);
    if (!imageType) {
      throw new BadRequestException('Please upload a valid image');
    }

    try {
      // return await this.uploadFile(
      //   userId,
      //   await UploaderService.compressImage(
      //     await UploaderService.streamToBuffer(createReadStream(), userId),
      //     ratio,
      //   ),
      //   '.png',
      // );

      return await UploaderService.streamToBuffer(createReadStream(), userId);
    } catch (error) {
      this.loggerService.error(error);
      throw new InternalServerErrorException('Error uploading image 1');
    }
  }

  /**
   * Delete File
   *
   * Takes a file url and deletes the file from the bucket
   */
  public deleteFile(url: string): void {
    const keyArr = url.split('.com/');

    if (keyArr.length !== 2 || !this.bucketData.url.includes(keyArr[0])) {
      this.loggerService.error('Invalid url to delete file');
    }

    this.client
      .send(
        new DeleteObjectCommand({
          Bucket: this.bucketData.name,
          Key: keyArr[1],
        }),
      )
      .then(() => this.loggerService.log('File deleted successfully'))
      .catch((error) => this.loggerService.error(error));
  }

  private async uploadFile(
    userId: string,
    fileBuffer: Buffer,
    fileExt: string,
  ): Promise<string> {
    const key = this.bucketData.folder + '/' + userId + fileExt;
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucketData.name,
          Body: fileBuffer,
          Key: key,
          // ACL: 'public-read',
        }),
      );
    } catch (error) {
      this.loggerService.error(error);
      throw new InternalServerErrorException('Error uploading file 2');
    }

    return this.bucketData.url + key;
  }
}
