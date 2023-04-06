import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import * as sharp from 'sharp';
import * as Jimp from 'jimp';
import { UploadImagesDto } from './dto/uploadImages.dto.';
import * as fs from 'fs';
import { createDirectoryUser } from 'src/Functions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('--> Peticion para crear usuario');
    const findUser = await this.user.findOneBy({ id: createUserDto.id });
    if (findUser) {
      console.log('No se pudo crear el usuario');
      throw new HttpException('Repeat User', 400);
    }
    console.log('se creo el usuario');
    const newUser = await this.user.create({
      name: createUserDto.name,
      id: createUserDto.id,
      type: createUserDto.type ? createUserDto.type : 1,
    });
    return this.user.save(newUser);
  }

  async login(loginDto: LoginUserDto) {
    console.log('--> Peticion para inciar sesion');
    const findUser = await this.user.findOne({
      where: {
        id: loginDto.id,
      },
    });
    if (!findUser) {
      console.log('No se inicio sesion');
      return {
        id: null,
        type: null,
        status: false,
      };
    } else {
      console.log('Se inicio sesion');
      return {
        id: findUser.id,
        type: findUser.type,
        status: true,
      };
    }
  }

  async findAll() {
    console.log('--> Peticion para encontrar los usuarios');
    return await this.user.find();
  }

  async uploadFiles(
    files: Array<Express.Multer.File>,
    informacion: UploadImagesDto,
  ) {
    console.log("Guardando y comprimiendo imagenes: "+files.length);
    const borderType = informacion.bordertype;
    const findUser = await this.user.findOneBy({ id: informacion.idUser });
    //Checamos si existe el directorio del usuario
    if(!findUser){
      throw new HttpException("User not found",404)
    }
    const id = findUser.idUser;
    const directorio = await createDirectoryUser(id);
    const names = [];
    const size = files.length;
    files.forEach((data, index) => {
      const time = new Date();
      const nameTime = time.getTime()+'.jpg';
      const name = directorio + nameTime;
      sharp(data.buffer)
        .resize(250, 250)
        .toFile(name, (err) => {
          if (err) {
            console.log(err);
            throw new HttpException("Server Internal Error", 500);
          } else {
             names.push(name);
             console.log("Imagen comprimida: ", index);
          }
        });
    });
    names.forEach((name) => {
    //Marca de Agua
    Jimp.read(name)
    .then(async (image) => {
      const compressImage = image
        .resize(250, 250)
        .quality(90)
        .print(
          await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK),
          10,
          100,
          'Photo Republic',
        )
        .write(name)
        console.log("aplicando marca de agua")
    })
    .catch((err) => {
      console.log(err);
    });
    })

  }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: string) {
    console.log('--> Peticion para eliminar usuario');
    const deleteUserInf = await this.user.delete({ id: id });
    console.log(deleteUserInf + '| ID:' + id);
    return deleteUserInf;
  }
}
