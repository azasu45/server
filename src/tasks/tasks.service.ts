import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import puppeteer from 'puppeteer';
import { JSDOM } from 'jsdom';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private BCV: number;
  constructor(@Inject(PrismaService) private prisma: PrismaService) {
    this.BCV = 0;
  }

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

  @Cron('0 2 * * * *', {
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
      const BS = parseFloat(strongs[4].textContent.replace(',', '.'));
      this.BCV = BS;
      const BCVValue = await this.prisma.currencyPrice.create({
        data: {
          name: 'BCV',
          value: BS,
        },
      });
      console.log(BCVValue);
      await browser.close();
    } catch (e) {
      this.logger.error('BCV_SCR: ERROR');
    }
  }

  getBCV(): number {
    return this.BCV;
  }
}
