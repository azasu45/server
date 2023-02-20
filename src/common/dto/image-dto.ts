import { Field, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../types';
import { IsOptional } from 'class-validator';

@InputType()
export class FileInput {
  @Field(() => String)
  @IsOptional()
  name: string;

  @Field(() => GraphQLUpload)
  @IsOptional()
  file: Promise<FileUpload>;
}
