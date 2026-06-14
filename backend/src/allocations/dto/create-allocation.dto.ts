import { IsNotEmpty, IsUUID, IsInt, Min, Max, IsDateString } from 'class-validator';

export class CreateAllocationDto {
  // Bắt buộc phải là chuẩn chuỗi UUID dài ngoằng
  @IsUUID('4', { message: 'ID Nhân viên không hợp lệ' }) 
  @IsNotEmpty()
  userId: string;

  @IsUUID('4', { message: 'ID Dự án không hợp lệ' })
  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty({ message: 'Vai trò trong dự án không được để trống' })
  projectRole: string; // VD: "Frontend Developer"

  @IsInt()
  @Min(1)
  @Max(100, { message: 'Công sức tối đa là 100%' })
  allocationRate: number; // Từ 1% đến 100%

  @IsDateString({}, { message: 'Ngày tham gia phải đúng định dạng (YYYY-MM-DD)' })
  joinDate: string;
}