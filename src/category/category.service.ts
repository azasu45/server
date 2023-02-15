import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    try {
      const { name } = createCategoryInput;
      const newCategory = await this.prisma.category.create({
        data: {
          name: name,
        },
      });

      return newCategory;
    } catch (e) {
      console.log(e);
      throw new Error('Error al crear la categoría');
    }
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }

  async update(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const { name } = updateCategoryInput;
    return await this.prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });
  }

  async remove(id: string): Promise<Category | null> {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
