import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  category: string;

  @ApiProperty({ required: true })
  brand: string;

  @ApiProperty({ required: false, default: 0 })
  volumeMilliliters?: number = 0;

  @ApiProperty({ required: false, default: 0 })
  weightGrams?: number = 0;

  @ApiProperty({ required: false, default: 0.0 })
  alcoholContent?: number = 0.0;

  @ApiProperty({ required: true })
  price: number;

  @ApiProperty({ required: true})
  stock: number;

  @ApiProperty({ required: true })
  description: string;
}
