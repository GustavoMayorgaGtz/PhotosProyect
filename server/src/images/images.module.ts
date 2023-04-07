import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Image]),
    /*Necesitamos importar las entidades que se utilizaran en
    los servicios de user */
  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
