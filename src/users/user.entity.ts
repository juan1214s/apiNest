import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import {Profile} from "./profile.entity"


@Entity() // indica q va poder convertit las clase en tablas y el nombre de la tabla
export class User{

    @PrimaryGeneratedColumn()//genera el id automatico
    id: number

    @Column({ unique: true })//indica q es una columna de una tabla y q el id debe de ser unico
    nombre: string

    @Column()
    password: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })//indica el tipo de fecha y q tome la fecha actual cuando se tome un registro
    fecha: Date

    @Column({ nullable: true })//indico q el campo no es obligatorio
    activo: boolean


    //asi se hace una relacion uno a uno 
    @OneToOne(()=> Profile)//importo profile
    @JoinColumn()//creo la union entre tablas
    profile: Profile //y le digo q crea una columna profile con el id de profile

}
