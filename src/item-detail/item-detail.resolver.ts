import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemDetailService } from './item-detail.service';
import { ItemDetail } from './entities/item-detail.entity';
import { CreateItemDetailInput } from './dto/create-item-detail.input';
import { UpdateItemDetailInput } from './dto/update-item-detail.input';

@Resolver(() => ItemDetail)
export class ItemDetailResolver {
  constructor(private readonly ItemDetailService: ItemDetailService) {}

  @Mutation(() => ItemDetail)
  createPriceDetail(
    @Args('createPriceDetailInput')
    createPriceDetailInput: CreateItemDetailInput,
  ) {
    return this.ItemDetailService.create(createPriceDetailInput);
  }

  @Query(() => [ItemDetail], { name: 'priceDetails' })
  findAll() {
    return this.ItemDetailService.findAll();
  }

  @Query(() => ItemDetail, { name: 'priceDetail' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.ItemDetailService.findOne(id);
  }

  @Mutation(() => ItemDetail)
  updatePriceDetail(
    @Args('updatePriceDetailInput')
    updatePriceDetailInput: UpdateItemDetailInput,
  ) {
    return this.ItemDetailService.update(
      updatePriceDetailInput.id,
      updatePriceDetailInput,
    );
  }

  @Mutation(() => ItemDetail)
  removePriceDetail(@Args('id', { type: () => String }) id: string) {
    return this.ItemDetailService.remove(id);
  }

  @Query(() => [ItemDetail])
  pricesUpdate(): Promise<ItemDetail[]> {
    return this.ItemDetailService.updatePrices();
  }
}
