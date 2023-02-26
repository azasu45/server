import { Injectable, Inject } from '@nestjs/common';
import { CreateItemDetailInput } from './dto/create-item-detail.input';
import { UpdateItemDetailInput } from './dto/update-item-detail.input';
import { ItemDetail } from './entities/item-detail.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemDetailService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  async create(
    createPriceDetailInput: CreateItemDetailInput,
  ): Promise<ItemDetail> {
    const { quantity, price, description, status, autoUpdate, itemId } =
      createPriceDetailInput;
    return await this.prisma.itemDetail.create({
      data: {
        itemId,
        quantity,
        autoUpdate,
        unit: 'KG',
        subName: '',
        description,
        status,
        price,
      },
    });
  }

  async findAll(): Promise<ItemDetail[]> {
    return await this.prisma.itemDetail.findMany();
  }

  findOne(id: string): Promise<ItemDetail> {
    throw new Error('vacio');
  }

  update(
    id: string,
    updatePriceDetailInput: UpdateItemDetailInput,
  ): Promise<ItemDetail> {
    throw new Error('vacio');
  }

  async updatePrices(): Promise<ItemDetail[]> {
    const result = await this.prisma.$transaction(async (tx) => {
      const prices = await tx.itemDetail.findMany({
        where: {
          autoUpdate: { equals: true },
        },
      });
      const updatePrices = [];
      for (const price of prices) {
        updatePrices.push(
          await tx.itemDetail.update({
            where: {
              id: price.id,
            },
            data: {
              price: price.price + 1,
            },
          }),
        );
      }
      return updatePrices;
    });
    return result;
  }

  remove(id: string): Promise<ItemDetail> {
    throw new Error('vacio');
  }
}
