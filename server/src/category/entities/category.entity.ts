import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    idCategory: number; 
    
    @Column()
    iconInteger: number;

    @Column()
    title: string;

    @ManyToOne(() => User, user => user.images)
    user: User
}
