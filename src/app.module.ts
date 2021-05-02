import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { createTypeOrmProdConfig } from './app.dbconfig';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(createTypeOrmProdConfig()),
    UsersModule
  ],
})
export class AppModule {}
