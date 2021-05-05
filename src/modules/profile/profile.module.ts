import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { FollowsEntity } from '../../entities/profile.entity';
import { UsersModule } from '../users/users.module';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, FollowsEntity]),
    UsersModule
  ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'profile/:username/follow', method: RequestMethod.ALL});
  }
}
