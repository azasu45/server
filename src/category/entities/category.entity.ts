import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsUUID, IsString, IsNotEmpty, Length } from 'class-validator';

@ObjectType()
export class Category {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  name: string;

  /*Items Relation*/
}
