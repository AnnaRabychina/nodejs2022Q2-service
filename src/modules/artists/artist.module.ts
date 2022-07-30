import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controllers/artist.controller';
import { AlbumService } from '../albums/services/album.service';
import { TrackService } from '../tracks/services/track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  providers: [ArtistService, AlbumService, TrackService],
  controllers: [ArtistController],
})
export class ArtistModule {}
