import { Controller, Body, Post } from '@nestjs/common';
import { ImagesService } from './images.service';


@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  GetImages(@Body() idUser: string){
    return this.imagesService.getImagesCompress(idUser);
  }
}
