import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AppConfService {
  private currenciesConf = [];
  private readonly logger = new Logger(AppConfService.name);
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Cron('0 10 * * * *', {
    timeZone: 'America/Caracas',
  })
  async setCurrency() {
    this.currenciesConf = await this.prisma.currencyPrice.findMany({
      orderBy: {
        createAt: 'desc',
      },
      take: 5,
    });
    for (const currency of this.currenciesConf) {
      currency.OneToOne = (1 / currency.value).toFixed(4);
      this.logger.debug(
        `name: ${currency.name}, value: ${currency.value}${currency.symbol}, ves:${currency.OneToOne}`,
      );
    }
  }
}
