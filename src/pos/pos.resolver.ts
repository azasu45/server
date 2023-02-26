import { Resolver } from '@nestjs/graphql';
import { PosService } from './pos.service';

@Resolver()
export class PosResolver {
  constructor(private readonly posService: PosService) {}
}
