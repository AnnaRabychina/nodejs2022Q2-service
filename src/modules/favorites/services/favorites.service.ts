import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IAlbum } from 'src/modules/albums/album.interface';
import { AlbumService } from 'src/modules/albums/services/album.service';
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
    const { albumsIds, tracksIds } = FavoritesService.favorites;
    const albums = AlbumService.albums.filter((album) =>
      albumsIds.includes(album.id),
    );
    const tracks = TrackService.tracks.filter((track) =>
      tracksIds.includes(track.id),
    );
    return { albums, tracks };
  }

  public async addToFavorites(
    type: string,
    id: string,
  ): Promise<IAlbum | ITrack> {
    switch (type) {
      case 'album':
        const album = AlbumService.albums.find((album) => album.id === id);
        if (!album) {
          throw new UnprocessableEntityException('Album not found');
        } else {
          FavoritesService.favorites.albumsIds.push(id);
          return album;
        }
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
      case 'album':
        const album = FavoritesService.favorites.albumsIds.find(
          (albumId) => albumId === id,
        );
        if (!album) {
          throw new NotFoundException('Album not found');
        } else {
          FavoritesService.favorites.albumsIds =
            FavoritesService.favorites.albumsIds.filter(
              (albumId) => albumId !== id,
            );
        }
        break;
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
