import { InputType, Field, ID, Float } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateItemDetailInput {
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
  itemId?: string;
}
