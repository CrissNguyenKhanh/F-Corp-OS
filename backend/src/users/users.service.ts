import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; // Import thư viện băm mật khẩu

@Injectable()
export class UsersService {
  // Tiêm (Inject) kho chứa dữ liệu của bảng User vào Service
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

   async create(createUserDto: CreateUserDto) {
      // 1. Băm mật khẩu (Mã hóa)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      // 2. Chuẩn bị giỏ hàng chứa dữ liệu mới
      const newUser = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      // 3. Lưu xuống Database
      const savedUser = await this.usersRepository.save(newUser);
      
      // 4. FIX LỖI Ở ĐÂY: Tách riêng password ra, gom toàn bộ data còn lại vào biến 'result'
      const { password, ...result } = savedUser;
      
      // Trả về result (đã không còn chứa password)
      return result;
    }
    
// Thêm hàm này để AuthService có thể gọi sang và tìm User
  // Sửa lại hàm findByEmail này
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    // Nếu user là null thì trả về undefined, nếu không thì trả về user
    return user ?? undefined; 
  }
  // Các hàm mặc định dưới đây chúng ta sẽ code sau
  findAll() { return `This action returns all users`; }
  findOne(id: number) { return `This action returns a #${id} user`; }
  update(id: number, updateUserDto: UpdateUserDto) { return `This action updates a #${id} user`; }
  remove(id: number) { return `This action removes a #${id} user`; }
}