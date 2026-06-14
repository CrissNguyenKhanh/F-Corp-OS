import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { AllocationsModule } from './allocations/allocations.module';

@Module({
  imports: [
    // 1. Khởi tạo Két sắt Môi trường
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Khởi tạo Kết nối Database chạy bất đồng bộ (Đợi đọc xong .env mới kết nối)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // Hoặc 'postgres' tùy Database của bạn
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Tự động tạo bảng từ code (CHỈ DÙNG KHI DEV, cấm dùng ở Production)
      }),
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    AllocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}