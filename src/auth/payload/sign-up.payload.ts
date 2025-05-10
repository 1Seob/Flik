import { IsDate, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender as PrismaGender } from '@prisma/client';
import { Transform } from 'class-transformer';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class SignUpPayload {
  @IsString()
  @ApiProperty({
    description: '로그인 ID',
    type: String,
  })
  loginId!: string;

  @IsString()
  @ApiProperty({
    description: '비밀번호',
    type: String,
  })
  password!: string;

  @IsString()
  @ApiProperty({
    description: '닉네임',
    type: String,
  })
  name!: string;

  @IsEmail()
  @ApiProperty({
    description: '이메일',
    type: String,
  })
  email!: string;

  @ApiProperty({
    description: '성별',
    enum: GenderEnum,
  })
  gender!: PrismaGender;

  @IsDate()
  @ApiProperty({
    description: '생년월일',
    type: Date,
  })
  birthday!: Date;

  @IsString()
  @ApiProperty({
    description: '프로필 이미지 URL',
    type: String,
    required: false,
  })
  profileImageUrl?: string | null;
}
