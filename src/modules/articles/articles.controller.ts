import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { articleData } from './dto/create-article.dto';
import { Article } from '../../entities/articles.entity';
import { ArticlesService } from './articles.service';
import {User} from '../users/users.decorator'
import { CommentDto } from './dto/create-comment.dto';
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
    @Post()
    @HttpCode(201)
    async postArticle(@Body() data: articleData, @User('email') email: string): Promise<Article> {
        return await this.articlesService.postArticle(data, email)
    }
    @Patch(':slug')
    async patchArticle(@Param('slug') slug: string, @Body() data: articleData): Promise<Article> {
        return await this.articlesService.patchArticle(slug, data);
    }
    @Delete(':slug')
    async deleteArticle(@Param('slug') slug: string) {
        return await this.articlesService.deleteArticle(slug);
    }
    @Post(':slug/comments')
    async addComment(@Body() data: CommentDto, @Param('slug') slug: string) {
        return await this.articlesService.addComment(data, slug);
    }
}
