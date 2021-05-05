import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { articleData } from './dto/create-article.dto';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { Article } from '../../entities/articles.entity';
import { slugify } from '../../utils/string-utils';
import { User } from '../../entities/user.entity';
import { sanitization } from '../../utils/security.utils';

@Injectable()
export class ArticlesService {
    constructor(@InjectRepository(Article) private readonly articleRepo: Repository<Article>,
    @InjectRepository(User) private readonly userRepo: Repository<User>){}

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
        article.author = sanitization(user)
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
}
