import { Module } from '@nestjs/common';
import { TrackService } from '../tracks/services/track.service';
import { AlbumController } from './controllers/album.controller';
import { AlbumService } from './services/album.service';

@Module({
  providers: [AlbumService, TrackService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
