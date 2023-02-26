import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { PrismaService } from '../prisma.service';
import { SearchArgs } from '../common/dto/args/search.args';
import { UploaderService } from '../uploader/uploader.service';

@Injectable()
export class ItemService {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    @Inject(UploaderService) private uploaderService: UploaderService,
  ) {}

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
      if (item)
        await this.uploaderService.uploadImage(item.id, createItemInput.file);
      return item;
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(searchArgs: SearchArgs): Promise<Item[]> {
    return await this.prisma.item.findMany({
      include: { category: true, inventoryItem: true },
    });
  }

  async findAllByInventory(searchArgs: SearchArgs): Promise<Item[]> {
    return await this.prisma.item.findMany({
      include: {
        category: true,
        inventoryItem: true,
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
        inventoryItem: true,
      },
    });
    if (!item) throw new NotFoundException(`item con el id no existe ${id}`);
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const { name, idCategory, status } = updateItemInput;
    await this.findOne(id);
    if (updateItemInput.file)
      this.uploaderService.uploadImage(id, updateItemInput.file);
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
          categoryId: idCategory,
          status,
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
