import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';

// nơi khai báo module, đăng ký controller, service và Entity liên quan đến Projects để NestJS biết và quản lý chúng
@Module({
  // BẮT BUỘC: Đăng ký Entity ở đây
  imports: [TypeOrmModule.forFeature([Project])], 
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}