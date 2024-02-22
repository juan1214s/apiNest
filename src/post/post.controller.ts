import { Body, Controller, Get, Post } from "@nestjs/common";
import { createPostDto } from "./dto/create-post.dto";
import { PostService } from "./post.service";

@Controller('/post')
export class PostController{
    
    //importa la clase donde se encuentran todos los metodos para la consulta o crud
    constructor(private PostService: PostService){}

    @Post()//extrae el json del cuerpo de la peticion y esos datos los asigno a la variable post y alli tipo los dotos
    createPost(@Body() post: createPostDto ){
        return this.PostService.createPost(post)
    }

    @Get()
    getPosts(){
       return this.PostService.getPosts()
    }
}