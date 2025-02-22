import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveBookPayload {
  @IsString()
  @ApiProperty({
    description: '책 제목',
    type: String,
  })
  title!: string;

  @IsString()
  @ApiProperty({
    description: '책 저자',
    type: String,
  })
  author!: string;
}
