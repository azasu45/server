import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateInventoryItemInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  itemId: string;

  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  inventoryId: string;
}
