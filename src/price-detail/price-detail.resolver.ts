import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PriceDetailService } from './price-detail.service';
import { PriceDetail } from './entities/price-detail.entity';
import { CreatePriceDetailInput } from './dto/create-price-detail.input';
import { UpdatePriceDetailInput } from './dto/update-price-detail.input';

@Resolver(() => PriceDetail)
export class PriceDetailResolver {
  constructor(private readonly priceDetailService: PriceDetailService) {}

  @Mutation(() => PriceDetail)
  createPriceDetail(
    @Args('createPriceDetailInput')
    createPriceDetailInput: CreatePriceDetailInput,
  ) {
    return this.priceDetailService.create(createPriceDetailInput);
  }

  @Query(() => [PriceDetail], { name: 'priceDetail' })
  findAll() {
    return this.priceDetailService.findAll();
  }

  @Query(() => PriceDetail, { name: 'priceDetail' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.priceDetailService.findOne(id);
  }

  @Mutation(() => PriceDetail)
  updatePriceDetail(
    @Args('updatePriceDetailInput')
    updatePriceDetailInput: UpdatePriceDetailInput,
  ) {
    return this.priceDetailService.update(
      updatePriceDetailInput.id,
      updatePriceDetailInput,
    );
  }

  @Mutation(() => PriceDetail)
  removePriceDetail(@Args('id', { type: () => String }) id: string) {
    return this.priceDetailService.remove(id);
  }
}
