import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity() // indica q va poder convertit las clase en tablas
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

}
