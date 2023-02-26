import { Module } from '@nestjs/common';
import { ItemDetailService } from './item-detail.service';
import { ItemDetailResolver } from './item-detail.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ItemDetailResolver, ItemDetailService, PrismaService],
})
export class ItemDetailModule {}
