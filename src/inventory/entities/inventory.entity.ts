import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID, IsBoolean, IsDate } from 'class-validator';
import { InventoryItem } from 'src/inventory-item/entities/inventory-item.entity';

@ObjectType()
export class Inventory {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => Boolean)
  @IsBoolean()
  status?: boolean;

  @Field(() => Date)
  @IsDate()
  createAt?: Date;

  @Field(() => [InventoryItem], { nullable: true })
  inventoryItems?: InventoryItem[] | null;
}
