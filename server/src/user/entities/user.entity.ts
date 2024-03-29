import { Category } from 'src/category/entities/category.entity';
import { Image } from 'src/images/entities/image.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  id: string;

  @Column({ nullable: false })
  typeEvent: string;

  @Column({ nullable: true, default: 1 })
  type: number;

  @OneToMany(() => Image, images => images.user)
  images: Image[]

  @OneToMany(() => Category, category => category.user)
  category:  Category[]
}
