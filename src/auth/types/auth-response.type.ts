import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
class Token {
  @Field(() => String)
  access_token: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => Token)
  token: Token;

  @Field(() => User)
  user: User;
}
