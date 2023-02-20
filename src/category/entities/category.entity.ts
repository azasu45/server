import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsUUID, IsString } from 'class-validator';

@ObjectType()
export class Category {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  name: string;

  /*Items Relation*/
}
