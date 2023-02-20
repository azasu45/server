import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { SearchArgs } from '../common/dto/args/search.args';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  async createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemService.create(createItemInput.idCategory, createItemInput);
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(@Args() searchArgs: SearchArgs): Promise<Item[]> {
    return this.itemService.findAll(searchArgs);
  }

  @Query(() => Item, { name: 'item' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
  ): Promise<Item> {
    return this.itemService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  async removeItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Item | null> {
    return this.itemService.remove(id);
  }
}
