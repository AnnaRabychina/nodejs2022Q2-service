import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IFavorites } from '../favorites.interface';

@Injectable()
export class FavoritesService {
  private static favorites: IFavorites = {
    albumsIds: [],
    tracksIds: [],
  };

  public async getFavorites() {
    const { tracksIds } = FavoritesService.favorites;
    return { tracksIds };
  }

  public async addToFavorites(type: string) {
    switch (type) {
      default:
        throw new UnprocessableEntityException('Invalid type');
    }
  }

  public async deleteFromFavorites(type: string): Promise<void> {
    switch (type) {
      default:
        throw new UnprocessableEntityException('Invalid type');
    }
  }
}
