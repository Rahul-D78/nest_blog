import { Controller, Get, Param, Post } from '@nestjs/common';
import { Article } from '../../entities/articles.entity';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    async getAllArticles(): Promise<Article[]> {
        return await this.articlesService.getAllArticles();
    }
    @Get(':slug')
    async getArticleBySlug(@Param('slug') slug: string): Promise<Article> {
        return await this.articlesService.getArticleBySlug(slug);
    }
    // @Post()
    // async postArticle(): Promise<Article> {
    //     return await this.articlesService
    // }
}
