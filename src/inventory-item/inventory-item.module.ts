import { Module } from '@nestjs/common';
import { InventoryItemService } from './inventory-item.service';
import { InventoryItemResolver } from './inventory-item.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [InventoryItemResolver, InventoryItemService, PrismaService],
})
export class InventoryItemModule {}
