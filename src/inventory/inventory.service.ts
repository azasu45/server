import { Injectable, Inject } from '@nestjs/common';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';
import { PrismaService } from '../prisma.service';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(createInventoryInput: CreateInventoryInput): Promise<Inventory> {
    const { name } = createInventoryInput;
    try {
      return await this.prisma.inventory.create({
        data: {
          name,
        },
      });
    } catch {}
  }

  async findAll(): Promise<Inventory[]> {
    try {
      return await this.prisma.inventory.findMany();
    } catch {}
  }

  async findOne(id: string): Promise<Inventory> {
    return this.prisma.inventory.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });
  }

  async update(
    id: string,
    updateInventoryInput: UpdateInventoryInput,
  ): Promise<Inventory> {
    const { name, status } = updateInventoryInput;
    return await this.prisma.inventory.update({
      where: {
        id,
      },
      data: {
        name,
        status,
      },
    });
  }

  async remove(id: string): Promise<Inventory> {
    return await this.prisma.inventory.delete({
      where: {
        id,
      },
    });
  }
}
