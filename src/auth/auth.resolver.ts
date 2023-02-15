import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { SignupInput, SigninInput } from './dto';
import { AuthResponse } from './types/auth-response.type';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from './enums/valid-roles.enums';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(GqlAuthGuard)
  revalidateToken(
    @CurrentUser({ roles: [ValidRoles.admin, ValidRoles.user] }) user: User,
  ): AuthResponse {
    return this.authService.revalidateToken(user);
  }

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse, { name: 'signin' })
  async signin(
    @Args('signinInput') signinInput: SigninInput,
  ): Promise<AuthResponse> {
    return this.authService.signin(signinInput);
  }
}
