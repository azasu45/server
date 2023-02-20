import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InventoryItemService } from './inventory-item.service';
import { InventoryItem } from './entities/inventory-item.entity';
import { CreateInventoryItemInput } from './dto/create-inventory-item.input';
import { UpdateInventoryItemInput } from './dto/update-inventory-item.input';

@Resolver(() => InventoryItem)
export class InventoryItemResolver {
  constructor(private readonly inventoryItemService: InventoryItemService) {}

  @Mutation(() => InventoryItem)
  createInventoryItem(
    @Args('createInventoryItemInput')
    createInventoryItemInput: CreateInventoryItemInput,
  ): Promise<InventoryItem> {
    return this.inventoryItemService.create(createInventoryItemInput);
  }

  @Query(() => [InventoryItem], { name: 'inventoryItems' })
  findAll(): Promise<InventoryItem[]> {
    return this.inventoryItemService.findAll();
  }

  @Query(() => InventoryItem, { name: 'inventoryItem' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<InventoryItem> {
    return this.inventoryItemService.findOne(id);
  }

  @Mutation(() => InventoryItem)
  updateInventoryItem(
    @Args('updateInventoryItemInput')
    updateInventoryItemInput: UpdateInventoryItemInput,
  ): Promise<InventoryItem> {
    return this.inventoryItemService.update(
      updateInventoryItemInput.id,
      updateInventoryItemInput,
    );
  }

  @Mutation(() => InventoryItem)
  removeInventoryItem(
    @Args('id', { type: () => String }) id: string,
  ): Promise<InventoryItem> {
    return this.inventoryItemService.remove(id);
  }
}
