import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengeRepository } from './challenge.repository';
import { ChallengeType } from './enums/challenge-type.enum';
import { CreateChallengePayload } from './dto/create-challenge.payload';
import { ChallengeStatusDto } from './dto/challenge-status.dto';

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async setChallenge(userId: number, bookId: number, payload: CreateChallengePayload) {
    return this.challengeRepository.updateChallenge(userId, bookId, payload.challengeType);
  }

  async getChallengeStatus(userId: number, bookId: number): Promise<ChallengeStatusDto> {
    const data = await this.challengeRepository.getChallenge(userId, bookId);

    if (!data || !data.challengeStartDate || data.challengeType === ChallengeType.NONE) {
      throw new NotFoundException('챌린지가 없습니다.');
    }

    const start = new Date(data.challengeStartDate);
    const now = new Date();

    const duration = data.challengeType === ChallengeType.WEEKLY ? 7 : 30;
    const dDay = Math.max(
      0,
      Math.ceil((start.getTime() + 86400000 * duration - now.getTime()) / 86400000),
    );

    const readDays: string[] = [];

    for (let i = 0; i < duration; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const dayStr = day.toISOString().slice(0, 10);
      const updatedStr = data.updatedAt.toISOString().slice(0, 10);

      if (dayStr === updatedStr) {
        readDays.push(dayStr);
      }
    }

    return { dDay, success: data.challengeSuccess, readDays };
  }

  async getActiveChallenges(userId: number) {
    return this.challengeRepository.getActiveChallenges(userId);
  }
}
