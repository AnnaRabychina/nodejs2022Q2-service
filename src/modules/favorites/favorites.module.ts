import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';
import { ArtistService } from '../artists/services/artist.service';
import { AlbumService } from '../albums/services/album.service';
import { TrackService } from '../tracks/services/track.service';

@Module({
  providers: [FavoritesService, ArtistService, AlbumService, TrackService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
