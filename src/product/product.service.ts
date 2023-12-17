import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepo.create(createProductDto);
    await this.productRepo.save(newProduct);
    return newProduct;
  }

  async getProducts() {
    const products =  await this.productRepo.find();
    return products;
  }

  async getProduct(productById: string) {
    const product = await this.productRepo.findOneBy({ id: productById});
    if(!product) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    if(product) return product;
  }

  async updateProduct(id: string, updateProductDto: CreateProductDto) {
    await this.productRepo.update(id, updateProductDto);
    const product = await this.productRepo.findOneBy({ id });
    if(!product) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    if(product) return product;
  }

  async deleteProduct(id: string) {
    await this.productRepo.delete(id);
    return "Delete Success";
  }

  async deleteProducts() {
    await this.productRepo.clear();
    return 'Delete All Success'
  }

}
