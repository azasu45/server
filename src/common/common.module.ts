import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonResolver } from './common.resolver';

@Module({
  providers: [CommonService, CommonResolver],
})
export class CommonModule {}
