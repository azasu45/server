import { IsUUID } from 'class-validator';
import { CreateInventoryItemInput } from './create-inventory-item.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateInventoryItemInput extends PartialType(
  CreateInventoryItemInput,
) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
