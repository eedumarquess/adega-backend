import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService
  ) {}
  
  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({ data: createProductDto })
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({ 
      where: { id },
      include: {
        user: true
      }
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({ 
        where: { id },
        data: updateProductDto
      });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }
}
