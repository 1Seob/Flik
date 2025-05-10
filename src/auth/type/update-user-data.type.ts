import { Gender } from '@prisma/client';

export type UpdateUserData = {
  loginId?: string;
  birthday?: Date;
  gender?: Gender;
  profileImageUrl?: string | null;
  email?: string;
  password?: string;
  name?: string;
  refreshToken?: string | null;
};
