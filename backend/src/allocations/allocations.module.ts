import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocationsService } from './allocations.service';
import { AllocationsController } from './allocations.controller';
import { Allocation } from './entities/allocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Allocation])], // Đăng ký bảng
  controllers: [AllocationsController],
  providers: [AllocationsService],
})
export class AllocationsModule {}