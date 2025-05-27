import { ApiProperty } from '@nestjs/swagger';

export class ChallengeStatusDto {
  @ApiProperty({ example: 5, description: '챌린지 종료까지 남은 일수 (D-day)' })
  dDay!: number;

  @ApiProperty({ example: true, description: '챌린지 성공 여부' })
  success!: boolean | null;

  @ApiProperty({
    example: ['2025-05-27', '2025-05-28'],
    description: '챌린지 동안 독서한 날짜 리스트 (YYYY-MM-DD 형식)',
  })
  readDays!: string[];
}
