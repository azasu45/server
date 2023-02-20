import { InputType, Field, ID, Float } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreatePriceDetailInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => Date)
  @IsDate()
  createAt: Date;

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
  inventoryItemId: string;
}
