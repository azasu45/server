import { Module } from '@nestjs/common';
import { PosService } from './pos.service';
import { PosResolver } from './pos.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PosResolver, PosService, PrismaService],
})
export class PosModule {}
