import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './modules/artists/artist.module';
import { AlbumModule } from './modules/albums/album.module';
import { TrackModule } from './modules/tracks/track.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({ ...configService }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
