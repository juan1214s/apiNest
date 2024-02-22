import { Body, Controller, Post, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import {CreateUserDto, updateType, createProfile} from "./dto/create-user.dto"
import {UsersService} from "./users.service"
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}
    
    @Get()
    //y promise es q espera el array user y q cuando lo optenga ejecuta la funciion y si se manejan los mensaje manualmente no es necesario utilizar las promesas
    getUsers():Promise<User[]>{//indica q va devolver un array 
        return this.userService.getUsers();
    }

    //<User> es la tabla o la clase
    @Get(':id')//indica q se va pasar el id en la ruta
    getUserId(@Param('id', ParseIntPipe) id: number){//extrae el id de la peticion y lo asigna a la variable id y el ParseIntPipe indica q el id es de tipo numero
        return this.userService.getUserId(id)
    }

    @Post()//metodo //Body es el objeto de la peticion
    createUser(@Body() newUser: CreateUserDto){
       return this.userService.createUser(newUser);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
       return this.userService.deleteUser(id)
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: updateType){
        return this.userService.updateUser(id, user)
    }
    

    @Post(':id/profile')
    crearProfile(@Param('id', ParseIntPipe) id: number, @Body() profile: createProfile){
       return this.userService.crearProfile(id, profile);
    }

}
