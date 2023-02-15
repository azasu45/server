import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Mutation(() => Inventory)
  async createInventory(
    @Args('createInventoryInput') createInventoryInput: CreateInventoryInput,
  ): Promise<Inventory> {
    return this.inventoryService.create(createInventoryInput);
  }

  @Query(() => [Inventory], { name: 'inventories' })
  async findAll(): Promise<Inventory[]> {
    return await this.inventoryService.findAll();
  }

  @Query(() => Inventory, { name: 'inventory' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Inventory> {
    return await this.inventoryService.findOne(id);
  }

  @Mutation(() => Inventory)
  async updateInventory(
    @Args('updateInventoryInput') updateInventoryInput: UpdateInventoryInput,
  ): Promise<Inventory> {
    return await this.inventoryService.update(
      updateInventoryInput.id,
      updateInventoryInput,
    );
  }

  @Mutation(() => Inventory)
  async removeInventory(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Inventory> {
    return await this.inventoryService.remove(id);
  }
}
