import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { PrismaService } from 'src/prisma.service';
import { UploaderService } from '../uploader/uploader.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    ItemResolver,
    ItemService,
    PrismaService,
    UploaderService,
    ConfigService,
  ],
  exports: [ItemService],
})
export class ItemModule {}
