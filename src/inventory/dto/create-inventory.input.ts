import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateInventoryInput {
  @Field(() => String)
  @IsString()
  name: string;
}
