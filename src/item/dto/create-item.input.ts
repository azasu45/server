import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

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
}
