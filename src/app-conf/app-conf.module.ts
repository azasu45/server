import { Module } from '@nestjs/common';
import { AppConfService } from './app-conf.service';
import { AppConfResolver } from './app-conf.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [AppConfResolver, AppConfService, PrismaService],
})
export class AppConfModule {}
