import { Controller, Body, Post } from '@nestjs/common';
import { ImagesService } from './images.service';
import { getImageDto } from './dto/get-images.dto';


@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  GetImages(@Body() idUser: getImageDto){
    console.log(idUser);
    return this.imagesService.getImagesCompress(idUser);
  }
}
