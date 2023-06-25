import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    idImage: number;

    @Column({ nullable: false })
    pathCompress: string

    @Column({ nullable: false })
    pathOriginal: string

    @Column({ nullable: false })
    border: string

    @Column({ nullable: true })
    comments: string

    @Column({ nullable: true})
    orientation: string
    
    // @ManyToOne(() => Category, Category => Category.idCategory)
    // category: Category
    @Column({ nullable: true})
    category: string
    
    @ManyToOne(() => User, user => user.images)
    user: User
}  
