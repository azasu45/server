import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import {
  IsNumber,
  IsDate,
  IsUUID,
  IsPositive,
  IsBoolean,
  IsString,
} from 'class-validator';

@ObjectType()
export class ItemDetail {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => Date)
  @IsDate()
  createAt?: Date;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  price?: number;

  @Field(() => Boolean)
  @IsBoolean()
  status?: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  autoUpdate?: boolean;

  @Field(() => String)
  @IsString()
  description?: string;

  @Field(() => ID)
  @IsUUID()
  itemId: string;
}
