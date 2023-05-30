import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ImagesModule } from './images/images.module';
import { Image } from './images/entities/image.entity';
import { Category } from './category/entities/category.entity';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'photorepublic',
      entities: [User, Image, Category],
      synchronize: true,
    }),
    ImagesModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
