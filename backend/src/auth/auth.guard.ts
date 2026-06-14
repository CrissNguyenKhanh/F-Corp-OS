import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, 
    private configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Lấy token từ header của request
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Bạn chưa đăng nhập hoặc không có thẻ Token!');
    }
    
    try {
      // Dùng máy in thẻ JWT và chìa khóa bí mật để xác thực token là đồ thật hay giả
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      // Nếu là thật, gắn thông tin user vào request để các API bên trong có thể dùng
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Thẻ Token không hợp lệ hoặc đã hết hạn!');
    }
    return true;
  }

  // Hàm phụ trợ giúp bóc tách chữ "Bearer" ra khỏi Token
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}