import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackService } from 'src/modules/tracks/services/track.service';
import { ITrack } from 'src/modules/tracks/track.interface';
import { IFavorites } from '../favorites.interface';

@Injectable()
export class FavoritesService {
  private static favorites: IFavorites = {
    albumsIds: [],
    tracksIds: [],
  };

  public async getFavorites() {
    const { tracksIds } = FavoritesService.favorites;
    const tracks = TrackService.tracks.filter((track) =>
      tracksIds.includes(track.id),
    );
    return { tracks };
  }

  public async addToFavorites(type: string, id: string): Promise<ITrack> {
    switch (type) {
      case 'track':
        const track = TrackService.tracks.find((track) => track.id === id);
        if (!track) {
          throw new UnprocessableEntityException('Track not found');
        } else {
          FavoritesService.favorites.tracksIds.push(id);
          return track;
        }
      default:
        throw new UnprocessableEntityException('Invalid type');
    }
  }

  public async deleteFromFavorites(type: string, id: string): Promise<void> {
    switch (type) {
      case 'track':
        const track = FavoritesService.favorites.tracksIds.find(
          (trackId) => trackId === id,
        );
        if (!track) {
          throw new NotFoundException('Track not found');
        } else {
          FavoritesService.favorites.tracksIds =
            FavoritesService.favorites.tracksIds.filter(
              (trackId) => trackId !== id,
            );
        }
        break;
      default:
        throw new UnprocessableEntityException('Invalid type');
    }
  }
}
