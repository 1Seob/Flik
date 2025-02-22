import { Module } from '@nestjs/common';
import { ParagraphService } from './paragraph.service';
import { ParagraphController } from './paragraph.controller';
import { ParagraphRepository } from './paragrpah.repository';

@Module({
  providers: [ParagraphService, ParagraphRepository],
  controllers: [ParagraphController],
})
export class ParagraphModule {}
