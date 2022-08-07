import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../albums/album.module';
import { ArtistModule } from '../artists/artist.module';
import { TrackModule } from '../tracks/track.module';
import { FavoritesEntity } from './entities/favorites.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    ArtistModule,
    AlbumModule,
    TrackModule,
    AuthModule,
  ],
})
export class FavoritesModule {}
