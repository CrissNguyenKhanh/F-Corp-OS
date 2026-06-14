import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService // Cỗ máy in thẻ JWT
  ) {}

  async login(loginDto: LoginDto) {
    // 1. Tìm user trong DB bằng email
    const user = await this.usersService.findByEmail(loginDto.email);
    
    // Nếu không tìm thấy user
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng!');
    }

    // 2. Lấy mật khẩu người dùng gửi lên, băm ra và so sánh với mật khẩu trong DB
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    
    // Nếu mật khẩu sai
    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng!');
    }

    // 3. Nếu đúng 100%, chuẩn bị dữ liệu (payload) để in lên thẻ JWT
    // payload thực sự nằm trong token
    const payload = { sub: user.id, email: user.email, role: user.role };
    
    // Trả về Token và một ít thông tin User cho Frontend dễ hiển thị
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    };
  }
}