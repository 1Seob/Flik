import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { BookReadService } from './bookread.service';
import {
  ApiConsumes,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { UserBaseInfo } from '../auth/type/user-base-info.type';
import { BookReadQuery } from './query/bookread.query';
import { ReadingProgressDto } from './dto/reading-progress.dto';

@Controller('bookread')
@ApiTags('BookRead API')
export class BookReadController {
  constructor(private readonly bookReadService: BookReadService) {}

  @Post('read')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '문단(페이지) 읽기 정보 기록하기' })
  @ApiNoContentResponse({ description: '기록 성공' })
  async createBookRead(
    @CurrentUser() user: UserBaseInfo,
    @Query() bookReadData: BookReadQuery,
  ): Promise<void> {
    await this.bookReadService.createBookRead(user, bookReadData);
  }

  @Get('read/month')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저의 월별 읽은 책 조회' })
  @ApiOkResponse({
    description: '책 읽은 날짜 월별 조회 성공',
    type: [Number],
  })
  @ApiQuery({
    name: 'year',
    description: '조회할 연도',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'month',
    description: '조회할 월',
    required: true,
    type: Number,
  })
  async getBooksReadByMonth(
    @CurrentUser() user: UserBaseInfo,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
  ): Promise<number[]> {
    return this.bookReadService.getBooksReadByMonth(user, year, month);
  }

  @Get('read/week')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저가 최근 한 주간 읽은 책 조회' })
  @ApiOkResponse({
    type: [Number],
  })
  async getBooksReaddLastWeek(
    @CurrentUser() user: UserBaseInfo,
  ): Promise<number[]> {
    return this.bookReadService.getBooksReadLastWeek(user);
  }

  @Get('read/complete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저의 월별 완독한 책 조회' })
  @ApiOkResponse({
    description: '책 완독한 날짜 월별 조회 성공',
    type: [Number],
  })
  @ApiQuery({
    name: 'year',
    description: '조회할 연도',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'month',
    description: '조회할 월',
    required: true,
    type: Number,
  })
  async getBooksCompletedByMonth(
    @CurrentUser() user: UserBaseInfo,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
  ): Promise<number[]> {
    return this.bookReadService.getBooksCompletedByMonth(user, year, month);
  }

  @Get('read/complete/week')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저가 최근 한 주간 완독한 책 조회' })
  @ApiOkResponse({
    type: [Number],
  })
  async getBooksCompletedLastWeek(
    @CurrentUser() user: UserBaseInfo,
  ): Promise<number[]> {
    return this.bookReadService.getBooksCompletedLastWeek(user);
  }

  @Post('read/complete')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '책 완독했음을 기록하기' })
  @ApiNoContentResponse({ description: '책 완독 기록 성공' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'bookId',
    description: '책 ID',
    required: true,
    type: Number,
  })
  async completeBookRead(
    @CurrentUser() user: UserBaseInfo,
    @Query('bookId', ParseIntPipe) bookId: number,
  ): Promise<void> {
    await this.bookReadService.completeBookRead(user, bookId);
  }

  @Get('read/daily-progress')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '날짜별 유저의 일일 읽기 진행률 조회' })
  @ApiOkResponse({ type: ReadingProgressDto })
  @ApiQuery({
    name: 'year',
    description: '조회할 연도',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'month',
    description: '조회할 월',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'day',
    description: '조회할 날짜',
    required: true,
    type: Number,
  })
  async getDailyReadingProgress(
    @CurrentUser() user: UserBaseInfo,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
    @Query('day', ParseIntPipe) day: number,
  ): Promise<void> {
    return this.bookReadService.getDailyReadingProgress(user, year, month, day);
  }
}
