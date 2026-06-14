import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';
import { Allocation } from './entities/allocation.entity';

@Injectable()
export class AllocationsService {
  constructor(
    @InjectRepository(Allocation)
    private allocationsRepository: Repository<Allocation>,
  ) {}

  async create(dto: CreateAllocationDto) {
    try {
      // Dùng cú pháp object trỏ ID để TypeORM tự nối Khóa ngoại
      const newAllocation = this.allocationsRepository.create({
        user: { id: dto.userId },
        project: { id: dto.projectId },
        projectRole: dto.projectRole,
        allocationRate: dto.allocationRate,
        joinDate: dto.joinDate,
      });
      
      // Lưu xuống Database
      return await this.allocationsRepository.save(newAllocation);
    } catch (error) {
      // Bắt lỗi nếu ID truyền vào bị sai (không tồn tại trong DB)
      throw new BadRequestException('Lỗi điều phối! Có thể ID Nhân viên hoặc ID Dự án không tồn tại.');
    }
  }

  findAll() { return `This action returns all allocations`; }
  findOne(id: number) { return `This action returns a #${id} allocation`; }
  update(id: number, updateAllocationDto: UpdateAllocationDto) { return `This action updates a #${id} allocation`; }
  remove(id: number) { return `This action removes a #${id} allocation`; }
}