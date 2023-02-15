import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  admin = 'admin',
  user = 'user',
  superUser = 'superUser',
  shopUser = 'shopUser',
  shopperUser = 'shopperUser',
}

registerEnumType(ValidRoles, { name: 'ValidRoles' });
