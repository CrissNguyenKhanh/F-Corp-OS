import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  // Import dòng này để liên kết Entity với TypeORM
  imports: [TypeOrmModule.forFeature([User])], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}