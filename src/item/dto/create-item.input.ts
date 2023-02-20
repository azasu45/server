import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID, Length } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/common/types';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  @IsNotEmpty()
  @Length(0, 20)
  name: string;

  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  idCategory: string;

  @Field(() => GraphQLUpload)
  @IsOptional()
  file: Promise<FileUpload>;
}
