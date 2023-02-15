import { Field, InputType } from '@nestjs/graphql';
import { FileUpload } from '../types';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class ImagenInput {
  @Field(() => GraphQLUpload)
  file: FileUpload;

  @Field(() => String)
  name: string;
}
