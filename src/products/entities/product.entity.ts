import { Product } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  volumeMilliliters: number;

  @ApiProperty()
  weightGrams: number;

  @ApiProperty()
  alcoholContent: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;
}
