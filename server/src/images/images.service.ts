import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository, TreeLevelColumn } from 'typeorm';
import { Image } from './entities/image.entity';
import { ImagesModule } from './images.module';


@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    @InjectRepository(Image)
    private image: Repository<Image>,
  ) { }


  async getImagesCompress(idUser: string){
    const findUser = await this.user.findOne({
      where:{
        id: idUser 
      }
    })
    if(!findUser) throw new HttpException("No Images Found", 404);

    const images = this.image.find({
      where:{
        user:findUser
      },
      select:{
        idImage: true,
        pathCompress: true,
        pathOriginal:false,
        border: true
      }
    })

    if(!images) throw new HttpException("No Images Found", 404);

    return images;
  }
}
