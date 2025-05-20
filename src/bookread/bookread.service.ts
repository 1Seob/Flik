import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookReadRepository } from './bookread.repository';
import { BookRepository } from 'src/book/book.repository';
import { UserBaseInfo } from '../auth/type/user-base-info.type';
import { ReadingProgressDto } from './dto/reading-progress.dto';

@Injectable()
export class BookReadService {
  constructor(
    private readonly bookReadRepository: BookReadRepository,
    private readonly bookRepository: BookRepository,
  ) {}

  async createBookRead(
    user: UserBaseInfo,
    bookReadData: { bookId: number; lastPageIndex: number; dailyGoal: number },
  ) {
    const book = await this.bookRepository.getBookById(bookReadData.bookId);
    if (!book) {
      throw new NotFoundException('책을 찾을 수 없습니다.');
    }
    const bookRead = await this.bookReadRepository.createBookRead(
      user.id,
      bookReadData,
    );
    if (!bookRead) {
      throw new BadRequestException('책 읽기 정보 기록 실패');
    }
  }

  async getBooksReadByMonth(
    user: UserBaseInfo,
    year: number,
    month: number,
  ): Promise<number[]> {
    const booksRead = await this.bookReadRepository.getBooksReadByMonth(
      user.id,
      year,
      month,
    );

    if (!booksRead) {
      throw new BadRequestException('책 읽기 정보 조회 실패');
    }

    return booksRead;
  }

  async getBooksReadLastWeek(user: UserBaseInfo): Promise<number[]> {
    const booksRead = await this.bookReadRepository.getBooksReadLastWeek(
      user.id,
    );

    if (!booksRead) {
      throw new BadRequestException('책 읽기 정보 조회 실패');
    }

    return booksRead;
  }

  async completeBookRead(user: UserBaseInfo, bookId: number): Promise<void> {
    const book = await this.bookRepository.getBookById(bookId);
    if (!book) {
      throw new NotFoundException('책을 찾을 수 없습니다.');
    }

    const completed = await this.bookReadRepository.completeBookRead(
      user.id,
      bookId,
    );
    if (!completed) {
      throw new ConflictException('책 완독 기록 실패');
    }
  }

  async getBooksCompletedByMonth(
    user: UserBaseInfo,
    year: number,
    month: number,
  ): Promise<number[]> {
    const booksCompleted =
      await this.bookReadRepository.getBooksCompletedByMonth(
        user.id,
        year,
        month,
      );

    if (!booksCompleted) {
      throw new BadRequestException('책 완독 정보 조회 실패');
    }

    return booksCompleted;
  }

  async getBooksCompletedLastWeek(user: UserBaseInfo): Promise<number[]> {
    const booksCompleted =
      await this.bookReadRepository.getBooksCompletedLastWeek(user.id);

    if (!booksCompleted) {
      throw new BadRequestException('책 완독 정보 조회 실패');
    }

    return booksCompleted;
  }

  async getDailyReadingProgress(
    user: UserBaseInfo,
    year: number,
    month: number,
    day: number,
  ): Promise<ReadingProgressDto[]> {
    const books,
      progressRates = await this.bookReadRepository.getDailyReadingProgress(
        user.id,
        year,
        month,
        day,
      );
    if (!books || !progressRates) {
      throw new BadRequestException('읽기 진행률 조회 실패');
    }

    return ReadingProgressDto.fromArray(books, progressRates);
  }
}
