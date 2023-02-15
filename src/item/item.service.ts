import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { PrismaService } from '../prisma.service';
import { SearchArgs } from '../common/dto/args/search.args';

@Injectable()
export class ItemService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(
    idCategory: string,
    createItemInput: CreateItemInput,
  ): Promise<Item> {
    const { name } = createItemInput;
    try {
      const item = await this.prisma.item.create({
        data: {
          name: name,
          category: {
            connect: {
              id: idCategory,
            },
          },
        },
      });
      return item;
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(searchArgs: SearchArgs): Promise<Item[]> {
    return await this.prisma.item.findMany({
      where: {
        inventoryId:
          searchArgs.search.length !== 0 ? searchArgs.search : undefined,
      },
      include: {
        category: true,
        inventory: true,
      },
    });
  }

  async findAllByInventory(searchArgs: SearchArgs): Promise<Item[]> {
    return await this.prisma.item.findMany({
      where: {
        inventoryId:
          searchArgs.search.length !== 0 ? searchArgs.search : undefined,
      },
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string): Promise<Item | null> {
    const item = await this.prisma.item.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        inventory: true,
      },
    });
    if (!item) throw new NotFoundException(`item con el id no existe ${id}`);
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const { name, idCategory, status } = updateItemInput;
    await this.findOne(id);
    try {
      return await this.prisma.item.update({
        where: {
          id,
        },
        include: {
          category: true,
        },
        data: {
          name,
          idCategory,
          status,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async updateByInventory(id: string, inventoryId: string): Promise<Item> {
    console.log(inventoryId);
    await this.findOne(id);
    try {
      return await this.prisma.item.update({
        where: {
          id,
        },
        data: {
          inventoryId: inventoryId,
        },
        include: {
          inventory: true,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: string): Promise<Item | null> {
    try {
      return await this.prisma.item.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
