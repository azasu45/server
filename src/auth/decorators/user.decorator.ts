import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ForbiddenError } from 'apollo-server-core';

import { ValidRoles } from '../enums/valid-roles.enums';

import { customUser } from '../interface/customUser-decorator.interface';

export const CurrentUser = createParamDecorator(
  ({ roles = [], blocks = [] }: customUser, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (!user)
      throw new InternalServerErrorException(
        ` Usuario no esta en el request  - make sure that`,
      );

    if (roles.length === 0 && blocks.length === 0) return user;
    const array = user.roles.split('|');
    for (const role of array) {
      if (roles.includes(role as ValidRoles)) {
        user.roles = '';
        return user;
      }
    }

    throw new ForbiddenError(
      `User ${user.fullName} necesita  un rol valido [${roles}]`,
    );
  },
);
