import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { IAlbum } from 'src/modules/albums/album.interface';
import { AlbumService } from 'src/modules/albums/services/album.service';
import { TrackService } from 'src/modules/tracks/services/track.service';
import { ITrack } from 'src/modules/tracks/track.interface';
import { IFavoritesResponses } from '../favorites.interface';
import { FavoritesService } from '../services/favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getFavorites(): Promise<IFavoritesResponses> {
    return this.favoritesService.getFavorites();
  }

  @Post('/:type/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IAlbum | ITrack> {
    return this.favoritesService.addToFavorites(type, id);
  }

  @Delete('/:type/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteFromFavorites(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.deleteFromFavorites(type, id);
  }
}
