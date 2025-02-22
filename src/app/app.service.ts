import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  runningCheck(): string {
    return 'Flip is running!';
  }
}
