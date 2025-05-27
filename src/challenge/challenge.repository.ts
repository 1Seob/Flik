import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { ChallengeType } from './enums/challenge-type.enum';

@Injectable()
export class ChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateChallenge(
    userId: number,
    bookId: number,
    challengeType: ChallengeType,
  ) {
    return this.prisma.userBook.update({
      where: { userId_bookId: { userId, bookId } },
      data: {
        challengeType,
        challengeStartDate: new Date(),
        challengeSuccess: false,
      },
    });
  }

  async getChallenge(userId: number, bookId: number) {
    return this.prisma.userBook.findUnique({
      where: { userId_bookId: { userId, bookId } },
      select: {
        challengeType: true,
        challengeStartDate: true,
        challengeSuccess: true,
        updatedAt: true,
      },
    });
  }

  async getActiveChallenges(userId: number) {
    return this.prisma.userBook.findMany({
      where: {
        userId,
        challengeType: { not: ChallengeType.NONE },
      },
      select: {
        bookId: true,
        challengeType: true,
        challengeStartDate: true,
        challengeSuccess: true,
      },
    });
  }
}
