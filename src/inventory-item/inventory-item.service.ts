import { Inject, Injectable } from '@nestjs/common';
import { CreateInventoryItemInput } from './dto/create-inventory-item.input';
import { UpdateInventoryItemInput } from './dto/update-inventory-item.input';
import { InventoryItem } from './entities/inventory-item.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InventoryItemService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  async create(
    createInventoryItemInput: CreateInventoryItemInput,
  ): Promise<InventoryItem> {
    const { inventoryId, itemId } = createInventoryItemInput;
    return await this.prisma.inventoryItem.create({
      data: {
        item: {
          connect: {
            id: itemId,
          },
        },
        inventory: {
          connect: {
            id: inventoryId,
          },
        },
      },
    });
  }

  async findAll(): Promise<InventoryItem[]> {
    return await this.prisma.inventoryItem.findMany();
  }

  async findOne(id: string): Promise<InventoryItem> {
    return await this.prisma.inventoryItem.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateInventoryItemInput: UpdateInventoryItemInput,
  ): Promise<InventoryItem> {
    const { inventoryId, itemId } = updateInventoryItemInput;
    return await this.prisma.inventoryItem.update({
      where: {
        id,
      },
      data: {
        item: {
          connect: {
            id: itemId,
          },
        },
        inventory: {
          connect: {
            id: inventoryId,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<InventoryItem> {
    return await this.prisma.inventoryItem.delete({
      where: {
        id,
      },
    });
  }
}
