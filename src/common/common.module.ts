import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonResolver } from './common.resolver';
import { PrismaService } from 'src/prisma.service';
import { UploaderModule, UploaderService } from '@app/uploader';

@Module({
  providers: [CommonService, CommonResolver, PrismaService],
})
export class CommonModule {}
