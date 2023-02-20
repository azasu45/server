import { Module } from '@nestjs/common';
import { PriceDetailService } from './price-detail.service';
import { PriceDetailResolver } from './price-detail.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PriceDetailResolver, PriceDetailService, PrismaService],
})
export class PriceDetailModule {}
