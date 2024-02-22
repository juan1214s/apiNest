import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [ TypeOrmModule.forFeature([Post]), UsersModule],//importo la entidad o la tabla para poder q el modulo la reconozca
    providers: [PostService],
    controllers: [PostController],
})

export class PostsModule {}