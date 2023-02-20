import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload/GraphQLUpload.js';
import { FileUploadDto } from './file-upload.dto';

@InputType()
export class PictureDto {
  @Field(() => GraphQLUpload)
  public picture: Promise<FileUploadDto>;
}
