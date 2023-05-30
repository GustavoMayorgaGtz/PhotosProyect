import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { findCategoryUserDto } from './dto/findcategoryuser.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    @InjectRepository(Category)
    private category: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const id = createCategoryDto.id;
    const iconInteger = createCategoryDto.iconInteger;
    const title = createCategoryDto.title;

    //Buscar el usuario al que se le añade la categoria
    const findUser = await this.user.findOne({
      where: {
        id
      }
    })
    //Validar si el usuario existe
    if (!findUser) throw new HttpException("User not found", 404);

    //crear categoria
    const newCategory = await this.category.create({
      iconInteger,
      title,
      user: findUser
    })

    return this.category.save(newCategory);
  }

 async findAll(findCategoryUserDto: findCategoryUserDto) {
    const id = findCategoryUserDto.id;
    //Buscar categorias de usuario
    const findUser =  await this.user.findOne({
      where: {
        id
      },
      relations:{
        category: true
      }
    })
    if(!findUser) throw new HttpException("Not found", 404);

    return findUser;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
