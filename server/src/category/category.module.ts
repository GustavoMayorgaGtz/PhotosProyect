import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Image } from 'src/images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category, Image]),
    /*Necesitamos importar las entidades que se utilizaran en
    los servicios de user */
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
