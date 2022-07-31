import { Module } from '@nestjs/common';
import { TrackService } from './services/track.service';
import { TrackController } from './controllers/track.controller';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
