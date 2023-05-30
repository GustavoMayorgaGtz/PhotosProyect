import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Image } from 'src/images/entities/image.entity';
import { Category } from 'src/category/entities/category.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Image,  Category]),
    /*Necesitamos importar las entidades que se utilizaran en
    los servicios de user */
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
