import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';
import { AlbumService } from '../albums/services/album.service';
import { TrackService } from '../tracks/services/track.service';

@Module({
  providers: [FavoritesService, AlbumService, TrackService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
