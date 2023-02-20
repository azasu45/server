import { IsUUID } from 'class-validator';
import { CreatePriceDetailInput } from './create-price-detail.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePriceDetailInput extends PartialType(
  CreatePriceDetailInput,
) {
  @Field(() => ID)
  id: string;
}
