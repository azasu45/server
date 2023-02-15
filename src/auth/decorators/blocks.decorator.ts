import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { BlocksEnum } from '../enums/blocks.enums';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenError } from 'apollo-server-core';

interface customUser {
  blocks?: BlocksEnum[];
}

export const BlockUser = createParamDecorator(
  ({ blocks = [] }: customUser, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user)
      throw new InternalServerErrorException(
        ` Usuario no esta en el request  - make sure that`,
      );

    if (blocks.length === 0) return user;

    for (const block of user.status)
      if (blocks.includes(block as BlocksEnum)) return user;

    throw new ForbiddenError(
      `User ${user.fullName} necesita un status de usuario valido valido [${blocks}]`,
    );
  },
);
