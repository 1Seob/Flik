import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PatchUpdateBookPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '책 제목',
    type: String,
  })
  title?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '책 저자',
    type: String,
  })
  author?: string | null;
}
