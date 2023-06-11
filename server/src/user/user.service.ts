import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UploadImagesDto } from './dto/uploadImages.dto.';
import { compress, createDirectoryUser, createName, saveOriginalImage } from 'src/Functions';
import { Image } from 'src/images/entities/image.entity';
import { Response } from 'express';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import * as sharp from 'sharp';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    @InjectRepository(Image)
    private image: Repository<Image>,
    @InjectRepository(Category)
    private category: Repository<Category>,
  ) { }

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
    res: Response
  ) {
    let borderType = [];
    try {
      borderType = JSON.parse(informacion.bordertype);
      console.log(borderType);
    } catch (e) {
      throw new HttpException("Server Internal Error", 500);
    }
    const findCategory = await this.category.findOneBy({ idCategory: informacion.idCategory });
    const findUser = await this.user.findOneBy({ id: informacion.idUser });
    //Checamos si existe el directorio del usuario
    if (!findUser || !findCategory) {
      throw new HttpException("User not found or Category not found", 404)
    }
    const id = findUser.idUser;
    const { directorio, directorioOriginal } = await createDirectoryUser(id);

    let names = [];
    let namesOriginal = [];
    const size = files.length;
    names = createName(size, directorio);
    namesOriginal = createName(size, directorioOriginal);
    files.forEach(async (data, id) => {
      saveOriginalImage(data.buffer, namesOriginal[id]).then(async () => {
        try {
          const metadata = await sharp(namesOriginal[id]).metadata();
          const { width, height } = metadata;
          let orientation;
          if (width > height) {
            orientation = "landscape";
          } else if (height > width) {
            orientation = "portrait";
          } else if (width == height) {
            orientation = "equal";
          }
          const thisBorder = borderType[id];
          const newImage = await this.image.create({
            pathCompress: names[id],
            pathOriginal: namesOriginal[id],
            border: thisBorder,
            user: findUser,
            category: findCategory,
            orientation
          })
          this.image.save(newImage);
        } catch (e) {
          console.log("error guardando imagen: ", e);
        }
      }).catch(() => {
        console.log("Error al guardar el archivo")
      })
      compress(data, names[id]);
     
    })

    //res.status(HttpStatus.OK).send({upload:true})
  }


  async findOne(id: string) {
    const users = await this.user.find({
      where: {
        id: id
      },
      relations: {
        images: true,
        category: true
      }
    })
    if (!users) throw new HttpException("No User Found", 404);
    console.log(users);
    return users[0];
  }


  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: string) {
    console.log('--> Peticion para eliminar usuario');
    //TODO: aun no se elimina la ruta de las imagenes
    const deleteUserInf = await this.user.delete({ id: id });
    console.log(deleteUserInf + '| ID:' + id);
    return deleteUserInf;
  }
}
