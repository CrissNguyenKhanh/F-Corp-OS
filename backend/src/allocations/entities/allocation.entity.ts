import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('allocations')
export class Allocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 1. Móc nối với bảng User
  @ManyToOne(() => User, (user) => user.allocations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // 2. Móc nối với bảng Project
  @ManyToOne(() => Project, (project) => project.allocations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  // 3. Các thông tin thêm của nghiệp vụ
  @Column({ type: 'varchar', length: 50 })
  projectRole: string; // Vai trò trong dự án (VD: Frontend Dev, BA, Tester)

  @Column({ type: 'int', default: 100 })
  allocationRate: number; // % Công sức tham gia (VD: 50% thời gian)

  @Column({ type: 'date' })
  joinDate: Date; // Ngày bắt đầu join dự án

  @Column({ type: 'date', nullable: true })
  leaveDate: Date; // Ngày rời dự án

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}