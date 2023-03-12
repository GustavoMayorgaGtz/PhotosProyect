import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  id: string;

  @Column({ nullable: true, default: 1 })
  type: number;
}
