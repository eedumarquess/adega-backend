import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MinLength } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  brand: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false, default: 0 })
  volumeMilliliters?: number = 0;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false, default: 0 })
  weightGrams?: number = 0;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @Max(100)
  @ApiProperty({ required: false, default: 0.0 })
  alcoholContent?: number = 0.0;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true})
  stock: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  description: string;
}
