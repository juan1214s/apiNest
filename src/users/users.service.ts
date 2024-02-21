import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { User } from './user.entity';
import { Repository } from "typeorm" //esta classe permite operaciones crud
import { CreateUserDto, updateType } from "./dto/create-user.dto"



@Injectable()
export class UsersService {
   //permite q user pueda realizar todas las operaciones de un CRUD  
   constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

   getUsers() {
      return this.userRepository.find()//find indica traeme todos los registros de el userRepository
   }

   async createUser(user: CreateUserDto) {

      //indica q si ese usuario ya existe haga lo siguiente
      const usuarioExiste = await this.userRepository.findOne({
         where: {
            nombre: user.nombre,
         }
      })

      if (usuarioExiste) {
         //asi se construyen los mensajes
         return new HttpException('El usuaro ya existe', HttpStatus.CONFLICT)
      }

      const newUser = this.userRepository.create(user)
      return this.userRepository.save(newUser)
   }

   async getUserId(id: number) {//indica q busque la columna id q me estan pasando
      const resultQuery = await this.userRepository.findOne({
         where: {
            id
         }
      })

      if (!resultQuery) {
         return new HttpException('El usuario q buscas no existe', HttpStatus.NOT_FOUND)
      }
      return resultQuery
   }

   async deleteUser(id: number) {
      const usuarioExiste = await this.userRepository.delete({ id })

      if (usuarioExiste.affected === 0) {
         return new HttpException('Intentas eliminar un usuario q no existe', HttpStatus.NOT_FOUND)
      }

      return usuarioExiste
   }

  async updateUser(id: number, user: updateType) {
   
      const usuarioExiste  = await this.userRepository.findOne({
         where:{id}
      })

      if (!usuarioExiste) {
         return new HttpException('Intentas actualizar un usuario q no existe', HttpStatus.NOT_FOUND)
      }

      //object.assing es un metodo de javascript en el q le pasas dos objetos y si tiene un parametro repetido lo remplaza por el parametro del segundo objwwto
      const updateUser = Object.assign(usuarioExiste, user);
      return this.userRepository.save(updateUser);//guarda el resultado de la combinacion de objetos
   }

  
}


