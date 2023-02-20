import { IConfig } from './interfaces/uploader-options.interface';

export function config(): IConfig {
  const bucketBase = `${process.env.BUCKET_REGION}.${process.env.BUCKET_HOST}.com`;

  return {
    uploader: {
      clientConfig: {
        //forcePathStyle: false,
        region: process.env.BUCKET_REGION,
        //endpoint: `https://${bucketBase}`,
        credentials: {
          accessKeyId: process.env.BUCKET_ACCESS_KEY,
          secretAccessKey: process.env.BUCKET_SECRET_KEY,
        },
      },
      bucketData: {
        name: process.env.BUCKET_NAME,
        folder: process.env.FILE_FOLDER,
        appUuid: process.env.SERVICE_ID,
        url: `https://${process.env.BUCKET_NAME}.${bucketBase}/`,
      },
      middleware: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10),
        maxFiles: parseInt(process.env.MAX_FILES, 10),
      },
    },
  };
}
