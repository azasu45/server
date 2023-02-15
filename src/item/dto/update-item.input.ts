import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';
import { CreateItemInput } from './create-item.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field(() => ID, { nullable: true })
  @ValidateIf((o) => o.inventoryId !== null)
  @IsUUID()
  inventoryId?: string | null;

  @Field(() => Boolean, { nullable: true })
  status?: boolean | null;
}
