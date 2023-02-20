import { Injectable, Inject } from '@nestjs/common';
import { CreatePriceDetailInput } from './dto/create-price-detail.input';
import { UpdatePriceDetailInput } from './dto/update-price-detail.input';
import { PriceDetail } from './entities/price-detail.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PriceDetailService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  async create(
    createPriceDetailInput: CreatePriceDetailInput,
  ): Promise<PriceDetail> {
    const { quantity, price, inventoryItemId } = createPriceDetailInput;
    return await this.prisma.priceDetail.create({
      data: {
        inventoryItemId,
        price,
        quantity,
      },
    });
  }

  findAll(): Promise<PriceDetail[]> {
    throw new Error('vacio');
  }

  findOne(id: string): Promise<PriceDetail> {
    throw new Error('vacio');
  }

  update(
    id: string,
    updatePriceDetailInput: UpdatePriceDetailInput,
  ): Promise<PriceDetail> {
    throw new Error('vacio');
  }

  remove(id: string): Promise<PriceDetail> {
    throw new Error('vacio');
  }
}
