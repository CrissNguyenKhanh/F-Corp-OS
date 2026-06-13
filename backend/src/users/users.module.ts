import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  // BẮT BUỘC: Thêm dòng này để chia sẻ hàm tìm User cho AuthModule dùng ké
  exports: [UsersService], 
})
export class UsersModule {}