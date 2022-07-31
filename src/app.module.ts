import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './modules/artists/artist.module';
import { AlbumModule } from './modules/albums/album.module';
import { TrackModule } from './modules/tracks/track.module';
import { UserModule } from './modules/users/user.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    ArtistModule,
    AlbumModule,
    TrackModule,
    UserModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
