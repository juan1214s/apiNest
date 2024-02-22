import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity('user_profile')
export class Profile {
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellidos: string;

    @Column()
    edad: number;

    @OneToOne(() => User, user => user.profile)
    user: User;
    //@OneToOne(() => User, user => user.profile): Establece una relación uno a uno con la entidad User. La primera función flecha especifica la entidad objetivo (User), y la segunda función flecha especifica la propiedad en la entidad User que se utilizará como relación inversa (profile).
}
