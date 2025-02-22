import { ApiProperty } from '@nestjs/swagger';
import { BookData } from '../type/book-data.type';

export class BookDto {
  @ApiProperty({
    description: '책 ID',
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: '책 제목',
    type: String,
  })
  title!: string;

  @ApiProperty({
    description: '책 저자',
    type: String,
  })
  author!: string;

  static from(data: BookData): BookDto {
    return {
      id: data.id,
      title: data.title,
      author: data.author,
    };
  }
}
