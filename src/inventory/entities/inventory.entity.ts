import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID, IsBoolean, IsDate } from 'class-validator';
import { Item } from 'src/item/entities/item.entity';

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

  @Field(() => [Item], { nullable: true })
  items?: Item[];
}
