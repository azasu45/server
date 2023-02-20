import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { Item } from 'src/item/entities/item.entity';

@ObjectType()
export class InventoryItem {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  itemId?: string | null;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  inventoryId?: string | null;

  @Field(() => Item, { nullable: true })
  item?: Item;
  //priceDetail ItemDetail[]
}
