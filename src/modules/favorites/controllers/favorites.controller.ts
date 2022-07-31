import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('/:type/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavorite(
    @Param('type') type: string,
    //@Param('id', new ParseUUIDPipe({ version: '4' })),
  ) {
    return this.favoritesService.addToFavorites(type);
  }

  @Delete('/:type/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteFromFavorites(
    @Param('type') type: string,
    // @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.deleteFromFavorites(type);
  }
}
