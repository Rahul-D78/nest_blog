import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { createTypeOrmProdConfig } from './app.dbconfig';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { ProfileModule } from './modules/profile/profile.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(createTypeOrmProdConfig()),
    UsersModule,
    ArticlesModule,
    ProfileModule,
  ],
})
export class AppModule {}
