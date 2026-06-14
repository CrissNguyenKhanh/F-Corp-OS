import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Allocation } from '../../allocations/entities/allocation.entity';
@Entity('projects') // Tên bảng trong Database MySQL
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string; // Tên dự án (Ví dụ: F-Corp OS Phase 1)

  @Column({ type: 'text', nullable: true })
  description: string; // Mô tả dự án

  // Trạng thái dự án
  @Column({ type: 'enum', enum: ['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD'], default: 'PLANNING' })
  status: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date; // Ngày bắt đầu

  @Column({ type: 'date', nullable: true })
  endDate: Date; // Ngày kết thúc dự kiến

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Allocation, (allocation) => allocation.project)
  allocations: Allocation[];
}