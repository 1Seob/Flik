import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';

@Module({
  providers: [BookService, BookRepository],
  controllers: [BookController],
})
export class BookModule {}
