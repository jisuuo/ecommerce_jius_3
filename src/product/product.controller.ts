import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Product 생성 API
  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  // Product 조회 API
  @Get('all')
  async getProducts() {
    return await this.productService.getProducts();
  }

  // Product 특정 조회 API
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getProduct(id);
  }

  // Product 수정 API
  @Patch(':id')
  async updateProduct(@Param('id') id:string, @Body() updateProductDto: CreateProductDto) {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  // Product 특정 삭제 API
  @Delete(':id')
  async deleteProduct(@Param('id') id:string) {
    return await this.productService.deleteProduct(id);
  }

  // Product 삭제 API
  @Delete()
  async deleteProducts() {
    return await this.productService.deleteProducts();
  }
}
