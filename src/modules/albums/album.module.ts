import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackService } from '../tracks/services/track.service';
import { AlbumController } from './controllers/album.controller';
import { AlbumEntity } from './entities/album.entity';
import { AlbumService } from './services/album.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  providers: [AlbumService, TrackService],
  controllers: [AlbumController],
})
export class AlbumModule {}
