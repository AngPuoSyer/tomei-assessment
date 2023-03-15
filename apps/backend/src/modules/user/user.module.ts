import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database/database.module';
import { USER_REPOSITORY } from '../../providers/database/repository.token';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useValue: UserModel,
    },
    UserService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
