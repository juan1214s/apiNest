import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Post } from "./post.entity";
import { Repository } from "typeorm";
import { createPostDto } from "./dto/create-post.dto";

@Injectable()
export class PostService {

    constructor(
        //importo la tabla y con repository q sirve para poder manejar las consultas a la base de datos
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private userService: UsersService //pero primero debo de exportarlo desde su clase y pornerlo en el modulo pricipal
    ) { }

    async createPost(post: createPostDto) {
        //necesito confirmar si el usuario existe, pero ya ese metodo lo tengo en otra clase entonces lo importo y lo utilizo
        const usuarioExiste = await this.userService.getUserId(post.authorId);

        if (!usuarioExiste) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

       const newPost = this.postRepository.create(post);
       return this.postRepository.save(newPost);
    }


    getPosts() {
        return this.postRepository.find({
            relations: ['author']//el uthor es por q en la tabla cuando hicimos la relacion le asignamos el usuario a esa variable entonces asi me trae todos los datos del author
        });
     }

}