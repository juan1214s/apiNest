import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string
    
    //esta columna pone el id del author en la publicacion
    @Column()
    authorId: number

    //muchos a uno
    @ManyToOne(()=> User, user => user.posts)
    author: User;
}
