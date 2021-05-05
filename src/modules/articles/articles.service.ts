import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { articleData } from './dto/create-article.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Article } from '../../entities/articles.entity';
import { slugify } from '../../utils/string-utils';

@Injectable()
export class ArticlesService {
    constructor(@InjectRepository(Article) private readonly articleRepo: Repository<Article>){}

    async getAllArticles(): Promise<Article[]> {
        return await this.articleRepo.find();
    }
    async getArticleBySlug(slug: string): Promise<Article> {
        return await this.articleRepo.findOne(slug);
    }
    async postArticle(data: articleData): Promise<Article> {

        const {title, description, body} = data;

        let article = new Article();
        article.slug = slugify(title);
        article.title = title;
        article.description = description;
        article.body = body;
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
