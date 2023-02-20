import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import {
  IsNumber,
  IsDate,
  IsUUID,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import { InventoryItem } from 'src/inventory-item/entities/inventory-item.entity';

@ObjectType()
export class PriceDetail {
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
  price: number;

  @Field(() => Boolean)
  @IsBoolean()
  status: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  autoUpdate?: boolean;

  @Field(() => String)
  description?: string;

  @Field(() => ID)
  @IsUUID()
  inventoryItemId: string;

  @Field(() => InventoryItem)
  InventoryItem?: InventoryItem;
}
