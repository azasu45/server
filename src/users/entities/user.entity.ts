import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsUUID, IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID)
  @IsUUID()
  id: string;

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

  @Field(() => String, { nullable: true })
  @IsString()
  @Length(0, 500)
  image?: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  status: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  roles: string;
}
