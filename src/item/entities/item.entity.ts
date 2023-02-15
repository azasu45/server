import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsString, IsUUID } from 'class-validator';
import { Category } from '../../category/entities/category.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

@ObjectType()
export class Item {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => Date)
  @IsDate()
  createAt: Date;

  @Field(() => Boolean)
  @IsBoolean()
  status: boolean;

  @Field(() => Category, { nullable: true })
  category?: Category | null;

  @Field(() => Inventory, { nullable: true })
  inventory?: Inventory | null;
}
