import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository,  } from 'typeorm';
import { Image } from './entities/image.entity';
import { find } from 'rxjs';
import { getImageDto } from './dto/get-images.dto';



@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    @InjectRepository(Image)
    private image: Repository<Image>,
  ) { }


  async getImagesCompress(idUser: getImageDto){
    const findUser = await this.user.findOne({
      where:{
        id: idUser.idUser 
      }
    })

    if(!findUser) throw new HttpException("No Images Found", 404);
    console.log(findUser)
    const images = await  this.image.find({
      where:{
        user:findUser
      },
      select:{
        idImage: true,
        pathCompress: true,
        pathOriginal:false,
        border: true
      },
      relations:{
        category: true
      }
    })

    if(!images) throw new HttpException("No Images Found", 404);
    console.log(images);
    return images;
  }
}
