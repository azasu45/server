import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class PersonalData {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
}
