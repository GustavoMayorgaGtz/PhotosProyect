import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFiles,
  Res,

} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadImagesDto } from './dto/uploadImages.dto.';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.userService.login(loginDto);
  }
  @Post('uploadFiles')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() informacion: UploadImagesDto,
    @Res() res : Response
  ) {
   // console.log(informacion);
    this.userService.uploadFiles( images, informacion,res);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
