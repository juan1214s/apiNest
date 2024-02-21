import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity'; // Importa la entidad User

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])], // Usar TypeOrmModule.forFeature para importar la entidad User y asi con todas las clases
})
export class UsersModule {}