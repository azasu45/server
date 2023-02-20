import { join, resolve } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
//import { JwtService } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { TasksModule } from './tasks/tasks.module';
import { InventoryModule } from './inventory/inventory.module';
import { CommonModule } from './common/common.module';
import { config } from './config/configuration';
import { UploaderModule } from './uploader/uploader.module';
import { InventoryItemModule } from './inventory-item/inventory-item.module';
import { PriceDetailModule } from './price-detail/price-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../client'),
      serveRoot: '/',
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ScheduleModule.forRoot()],
      inject: [],
      useFactory: async () => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        debug: false,
        playground: false,
        csrfPrevention: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context({ req }) {
          // const token = req.headers.authorization?.replace('Bearer ', '');
          // if (!token) throw Error('Necesita Token');
          // const payload = jwtService.decode(token);
          // if (!payload) throw Error('Token no valido');
        },
      }),
    }),
    UploaderModule,
    CommonModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    ItemModule,
    TasksModule,
    InventoryModule,
    UploaderModule,
    InventoryItemModule,
    PriceDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
