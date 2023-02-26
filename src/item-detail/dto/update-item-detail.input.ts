import { IsUUID } from 'class-validator';
import { CreateItemDetailInput } from './create-item-detail.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateItemDetailInput extends PartialType(CreateItemDetailInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
