import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

@InputType()
export class SigninInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  @Length(0, 30)
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password: string;
}
