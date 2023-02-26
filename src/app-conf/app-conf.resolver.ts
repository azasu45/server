import { Resolver, Query } from '@nestjs/graphql';
import { AppConfService } from './app-conf.service';

@Resolver()
export class AppConfResolver {
  constructor(private readonly appConfService: AppConfService) {}
  @Query(() => String, { name: 'currency' })
  currency() {
    console.log('hola');
  }
}
