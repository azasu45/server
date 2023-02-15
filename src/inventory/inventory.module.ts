import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryResolver } from './inventory.resolver';
import { PrismaService } from '../prisma.service';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [ItemModule],
  providers: [InventoryResolver, InventoryService, PrismaService],
})
export class InventoryModule {}
