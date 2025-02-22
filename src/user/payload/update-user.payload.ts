import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserPayload {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    description: '이메일',
    type: String,
  })
  email?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '이름',
    type: String,
  })
  name?: string | null;
}
