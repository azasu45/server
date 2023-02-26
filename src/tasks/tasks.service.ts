import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import puppeteer from 'puppeteer';
import { JSDOM } from 'jsdom';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Cron('0 1 * * * *', {
    timeZone: 'America/Caracas',
  })
  async handleCron() {
    try {
      const res = await fetch('https://petroapp-price.petro.gob.ve/price/', {
        method: 'POST',
        headers: {
          'Content-Type': ' application/json',
        },
        body: JSON.stringify({
          coins: ['PTR'],
          fiats: ['USD', 'Bs'],
        }),
      });
      const { data } = await res.json();
      if (data) {
        const BS = data.PTR.BS;
        const USD = data.PTR.USD;
        const PriceBs = BS / USD;
        this.logger.debug(`'PETRO_API: ${PriceBs} Bs'`);
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Cron('0 10 * * * *', {
    timeZone: 'America/Caracas',
  })
  async scraping() {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const res = await page.goto(
        'https://www.bcv.org.ve/sistemas-de-pago/tarifario-bancario',
      );
      const body = await res.text();
      const {
        window: { document },
      } = new JSDOM(body);
      const strongs = document.querySelectorAll('strong');
      const EuroValue = this.prisma.currencyPrice.create({
        data: {
          name: 'EUR',
          symbol: '€',
          value: parseFloat(strongs[0].textContent.replace(',', '.')),
        },
      });
      const YuanValue = this.prisma.currencyPrice.create({
        data: {
          name: 'CNY',
          symbol: '¥',
          value: parseFloat(strongs[1].textContent.replace(',', '.')),
        },
      });
      const TurkishValue = this.prisma.currencyPrice.create({
        data: {
          name: 'TRY',
          symbol: '₺',
          value: parseFloat(strongs[2].textContent.replace(',', '.')),
        },
      });
      const RubloValue = this.prisma.currencyPrice.create({
        data: {
          name: 'RUB',
          symbol: '₽',
          value: parseFloat(strongs[3].textContent.replace(',', '.')),
        },
      });
      const DollarValue = this.prisma.currencyPrice.create({
        data: {
          name: 'USD',
          symbol: '$',
          value: parseFloat(strongs[4].textContent.replace(',', '.')),
        },
      });

      const [euro, yuan, turkish, rublo, dollar] =
        await this.prisma.$transaction([
          EuroValue,
          YuanValue,
          TurkishValue,
          RubloValue,
          DollarValue,
        ]);

      this.logger.log(
        `Euro:${euro.value}, Yuan:${yuan.value}, Turkish:${turkish.value}, Rublo:${rublo.value}, Dollar${dollar.value}`,
      );
      await browser.close();
    } catch (e) {
      this.logger.error('BCV_SCR: ERROR');
    }
  }
}
