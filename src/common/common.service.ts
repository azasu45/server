import { Injectable, Inject } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { unlink } from 'fs';
import { FileInput } from './dto';

@Injectable()
export class CommonService {
  async deleteImage(name: string): Promise<boolean> {
    try {
      unlink(`client/public/images/${name}.png`, (err) => {
        if (err) throw err;
        console.log('se borro el archivo');
      });
      return true;
    } catch (e) {
      console.log(e);
    }
  }

  async createImagen(fileInput: FileInput): Promise<boolean> {
    const { createReadStream, filename } = await fileInput.file;
    try {
      return new Promise(async (resolve, reject) =>
        createReadStream()
          .pipe(
            createWriteStream(
              `./client/public/images/${
                fileInput.name ? `${fileInput.name}.png` : filename
              }`,
            ),
          )
          .on('finish', () => resolve(true))
          .on('error', () => reject(false)),
      );
    } catch (e) {
      console.log(e);
    }
  }
}
