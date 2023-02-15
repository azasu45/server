import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload } from './types';
import { CommonService } from './common.service';

@Resolver()
export class CommonResolver {
  constructor(private readonly commonService: CommonService) {}
  @Mutation(() => String, { name: 'createImage' })
  async createImagen(
    @Args({ name: 'file' }) file: FileUpload,
    @Args({ name: 'name' }) name: string,
  ): Promise<boolean> {
    return this.commonService.createImagen(file, name);
  }

  @Mutation(() => String, { name: 'deleteImagen' })
  async deleteImagen(
    @Args({ name: 'name', type: () => String })
    name: string,
  ): Promise<boolean> {
    return this.commonService.deleteImage(name);
  }
}
