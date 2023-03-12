import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

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

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
