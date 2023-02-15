import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { unlink } from 'fs';
import { FileUpload } from './types';

@Injectable()
export class CommonService {
  async deleteImage(name: string): Promise<boolean> {
    try {
      await unlink(`client/public/images/${name}.png`, (err) => {
        if (err) throw err;
        console.log('se borro el archivo');
      });
      return true;
    } catch (e) {
      console.log(e);
    }
  }

  async createImagen(file: FileUpload, name: string): Promise<boolean> {
    const { createReadStream, filename } = file;
    try {
      return new Promise(async (resolve, reject) =>
        createReadStream()
          .pipe(
            createWriteStream(
              `./client/public/images/${name ? `${name}.png` : filename}`,
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
