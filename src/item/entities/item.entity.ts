import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Category } from '../../category/entities/category.entity';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../../common/types/index';
import { InventoryItem } from 'src/inventory-item/entities/inventory-item.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

@ObjectType()
export class Item {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  image?: string;

  @Field(() => Date)
  @IsDate()
  createAt: Date;

  @Field(() => Boolean)
  @IsBoolean()
  status: boolean;

  @Field(() => GraphQLUpload, { nullable: true })
  @IsOptional()
  file?: Promise<FileUpload>;

  @Field(() => Category, { nullable: true })
  category?: Category | null;

  @Field(() => InventoryItem, { nullable: true })
  inventoryItem?: InventoryItem | null;

  @Field(() => Inventory, { nullable: true })
  inventory?: Inventory | null;
}
