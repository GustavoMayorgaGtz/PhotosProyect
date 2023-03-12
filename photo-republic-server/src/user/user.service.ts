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
    const findUser = await this.user.findOneBy({ id: createUserDto.id });
    if (findUser) throw new HttpException('Repeat User', 400);
    return this.user.create({
      name: createUserDto.name,
      id: createUserDto.id,
    });
  }

  async login(loginDto: LoginUserDto) {
    const findUser = await this.user.findOneBy({ id: loginDto.id });
    if (!findUser) throw new HttpException('No User Registrer', 400);
    return {
      id: findUser.id,
      type: findUser.type,
    };
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
