import { IsMimeType, IsString } from 'class-validator';
import { ReadStream } from 'fs';

export abstract class FileUploadDto {
  @IsString()
  filename!: string;
  @IsString()
  @IsMimeType()
  mimetype!: string;
  @IsString()
  encoding!: string;
  createReadStream: () => ReadStream;
}
