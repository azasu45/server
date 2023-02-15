import { Float, Query, Resolver } from '@nestjs/graphql';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => Float, { name: 'BCV' })
  getBcv() {
    return this.tasksService.getBCV();
  }
}
