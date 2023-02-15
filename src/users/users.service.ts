import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';

import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

//import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger('UserService');
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(CreateUserInput: CreateUserInput): Promise<User> {
    const { email, password, image } = CreateUserInput;
    const user = this.prisma.user.create({
      data: {
        email,
        image,
        password: bcrypt.hashSync(password, 10),
      },
    });
    if (!user) throw new Error('Error al crear el usuario');
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (e) {
      this.handleDBErrors({
        code: 'error-0000001',
        detail: `credenciales invalidas `,
      });
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      });
    } catch (e) {
      this.handleDBErrors({
        code: 'error-0000001',
        detail: `credenciales invalidas username`,
      });
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail.replace('Key', ''));

    if (error.code === 'error-0000001')
      throw new BadRequestException(error.detail.replace('Key', ''));

    this.logger.error(error);

    throw new InternalServerErrorException('Please check sercer logs');
  }
}
