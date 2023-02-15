import { registerEnumType } from '@nestjs/graphql';

export enum BlocksEnum {
  active = 'active',
  toActive = 'toActive',
  temporary = 'temporary',
  permanent = 'permanent',
}

registerEnumType(BlocksEnum, { name: 'BlocksEnum' });
