import { Global, Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [UploaderService, ConfigService],
  exports: [UploaderService],
})
export class UploaderModule {}
