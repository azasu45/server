import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

/*** Payment ***/

@Injectable()
export class PosService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async sale({ itemList }) {
    const result = await this.prisma.$transaction(async () => {});
  }

  adjustment() {}

  delete() {}
}
