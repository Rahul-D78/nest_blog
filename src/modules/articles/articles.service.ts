import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { articleData } from './dto/create-article.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Article } from '../../entities/articles.entity';
import { slugify } from '../../utils/string-utils';
import { User } from '../../entities/user.entity';
import { sanitization } from '../../utils/security.utils';
import { Comment } from '../../entities/comments.entity';
import { CommentDto } from './dto/create-comment.dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article) private readonly articleRepo: Repository<Article>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>
    ){}

    async getAllArticles(): Promise<Article[]> {
        return await this.articleRepo.find();
    }
    async getArticleBySlug(slug: string): Promise<Article> {
        return await this.articleRepo.findOne(slug);
    }   
    async postArticle(data: articleData, email: string): Promise<Article> {

        const {title, description, body} = data;
        const user = await this.userRepo.findOne(email)
        if(!user) throw new HttpException({message: "No user with this email found"}, HttpStatus.UNPROCESSABLE_ENTITY); 
        
        let article = new Article();
        article.slug = slugify(title);
        article.title = title;
        article.description = description;
        article.body = body;
        article.author = sanitization(user);
        article.comments = [];
        const newArticle = await this.articleRepo.save(article);
        return newArticle;
    }
    async patchArticle(slug: string, data: articleData): Promise<Article> {

        const {title, description, body} = data;

        const article = await this.articleRepo.findOne(slug);
        if(!article) throw new NotFoundException({status: HttpStatus.NOT_FOUND, error:'article with this slug does not exists'})
        
        if(title) article.slug = slugify(title);
        if(body) article.body = body;
        if(description) article.description = description;
        if(title) article.title = title;
        const newArticle = await this.articleRepo.save(article);
        return newArticle;
    }
    async putArticle(slug: string, articleData: any): Promise<Article> {
        let toUpdate = await this.articleRepo.findOne(slug);
        let updated = Object.assign(toUpdate, articleData);
        const article = await this.articleRepo.save(updated);
        return article;
    }
    async deleteArticle(slug: string): Promise<DeleteResult> {
        const article = await this.articleRepo.findOne(slug);
        if(!article) throw new NotFoundException({status: HttpStatus.NOT_FOUND, error:'article with this slug does not exists'})
        
        return await this.articleRepo.delete(slug);
    }
    async addComment(data: CommentDto, slug: string): Promise<Article> {
        let article = await this.articleRepo.findOne(slug);

        if(!article) throw new HttpException({message: "No slug found"}, HttpStatus.NOT_FOUND);

        const comment = new Comment();
        comment.body = data.body;
        
        article.comments.push(comment);

        await this.commentRepo.save(comment);
        article = await this.articleRepo.save(article);
        return article;
    }
}
