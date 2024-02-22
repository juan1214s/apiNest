import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm"//este modulo simplifica la conexion a la base de datos
import { User } from './users/user.entity';
import * as dotenv from 'dotenv';
import {Profile} from "./users/profile.entity"

dotenv.config()

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite', // Asegurarse de que el tipo sea uno de los tipos válidos
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Profile],//dice q cualquier carpeta de la ruta con la extencion la va cargar automaticamente
      synchronize: true //creo las tablas en codigo y este lo va reflejar en la base de datos
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
