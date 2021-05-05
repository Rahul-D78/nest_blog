import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { Article } from '../../entities/articles.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { UsersModule } from '../users/users.module';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User]), UsersModule],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'articles', method: RequestMethod.POST});
  }
}
