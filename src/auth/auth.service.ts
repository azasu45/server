import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthResponse } from './types/auth-response.type';
import { SignupInput, SigninInput } from './dto';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersServices: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  private getJwtToken(userId: string) {
    const payload = { id: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersServices.create(signupInput);
    const token = this.getJwtToken(user.id);
    return { token, user };
  }

  async signin(signinInput: SigninInput): Promise<AuthResponse> {
    const { email, password } = signinInput;
    const user = await this.usersServices.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password))
      throw new BadRequestException(`Credenciales invalidas`);

    const token = this.getJwtToken(user.id);
    return { token, user };
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user.id);
    return { token, user };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersServices.findOne(id);
    const array = user.status.split('|');
    for (const block of array) {
      if (block === 'temporary')
        throw new UnauthorizedException(`Usuario Bloqueado`);
      else if (block === 'permanent')
        throw new UnauthorizedException(`Usuario Bloqueado`);
      else if (block === 'toActive')
        throw new UnauthorizedException(
          `Usuario espere que el usuario sea activado por una tienda valida`,
        );
    }
    user.password = '';
    return user;
  }
}
