import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length, IsString } from 'class-validator';

@InputType()
export class SignupInput {
  @Field(() => String)
  @IsEmail()
  @Length(0, 30)
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsString()
  @Length(6, 30)
  @IsNotEmpty()
  password: string;
}
