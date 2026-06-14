import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Allocation } from '../../allocations/entities/allocation.entity';


@Entity('users') // Tên bảng trong Database
export class User {
  @PrimaryGeneratedColumn('uuid') // Tạo ID tự động dưới dạng mã băm ngẫu nhiên
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 }) // Sẽ dùng để lưu mật khẩu đã mã hóa (hashed)
  password: string;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  // Vai trò: Admin, PM, Dev
  @Column({ type: 'enum', enum: ['ADMIN', 'PM', 'DEV'], default: 'DEV' })
  role: string;

  // Trạng thái: Đang rảnh (AVAILABLE), Đang làm dự án (IN_PROJECT)
  @Column({ type: 'enum', enum: ['AVAILABLE', 'IN_PROJECT'], default: 'AVAILABLE' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Mối quan hệ 1-N với bảng Allocation
  @OneToMany(() => Allocation, (allocation) => allocation.user)
  allocations: Allocation[];
}