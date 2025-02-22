import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserBaseInfo } from '../auth/type/user-base-info.type';
import { UserDto } from './dto/user.dto';
import { UpdateUserPayload } from './payload/update-user.payload';
import { UpdateUserData } from '../auth/type/update-user-data.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: number): Promise<UserDto> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return UserDto.from(user);
  }

  async updateUser(
    userId: number,
    payload: UpdateUserPayload,
    user: UserBaseInfo,
  ): Promise<UserDto> {
    const data = this.validateNullOf(payload);

    const targetUser = await this.userRepository.getUserById(userId);

    if (!targetUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    if (userId !== user.id) {
      throw new ForbiddenException('타인의 계정은 수정할 수 없습니다.');
    }

    if (data.email) {
      const isEmailExist = await this.userRepository.isEmailExist(data.email);

      if (isEmailExist) {
        throw new ConflictException('이미 사용 중인 이메일입니다.');
      }
    }
    const updatedUser = await this.userRepository.updateUser(userId, data);

    return UserDto.from(updatedUser);
  }

  async deleteUser(userId: number, user: UserBaseInfo): Promise<void> {
    if (userId !== user.id) {
      throw new ForbiddenException('타인의 계정은 삭제할 수 없습니다.');
    }

    return this.userRepository.deleteUser(userId);
  }

  private validateNullOf(payload: UpdateUserPayload): UpdateUserData {
    if (payload.name === null) {
      throw new BadRequestException('이름은 null이 될 수 없습니다.');
    }

    if (payload.email === null) {
      throw new BadRequestException('이메일은 null이 될 수 없습니다.');
    }

    return {
      name: payload.name,
      email: payload.email,
    };
  }
}
