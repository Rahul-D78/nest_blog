import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../entities/articles.entity';

@Injectable()
export class ArticlesService {
    constructor(@InjectRepository(Article) private readonly articleRepo: Repository<Article>){}

    async getAllArticles(): Promise<Article[]> {
        return await this.articleRepo.find();
    }
    async getArticleBySlug(slug: string): Promise<Article> {
        return await this.articleRepo.findOne(slug);
    }
}
