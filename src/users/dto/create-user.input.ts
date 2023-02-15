import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  @Length(0, 40)
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(0, 20)
  password: string;

  @Field(() => String)
  @IsString()
  @Length(0, 500)
  image?: string;
}
