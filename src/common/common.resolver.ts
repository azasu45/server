import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommonService } from './common.service';
import { UploaderService } from 'src/uploader/uploader.service';
import { FileInput } from './dto';
@Resolver()
export class CommonResolver {
  constructor(
    private readonly commonService: CommonService,
    private readonly uploadService: UploaderService,
  ) {}

  @Mutation(() => Boolean, { name: 'createImage' })
  async createImagen(
    // @Args({ name: 'file', type: () => GraphQLUpload })
    // { createReadStream, filename }: FileUpload,
    @Args({ name: 'fileInput' }) fileInput: FileInput,
  ): Promise<boolean> {
    //return this.commonService.createImagen(fileInput);
    const number = Math.floor(Math.random() * 1000);
    const string = await this.uploadService.uploadImage(
      number.toString(),
      fileInput.file,
    );
    console.log(string);
    return true;
  }
  @Mutation(() => String, { name: 'deleteImagen' })
  deleteImagen(
    @Args({ name: 'name', type: () => String })
    name: string,
  ): Promise<boolean> {
    return this.commonService.deleteImage(name);
  }
}
