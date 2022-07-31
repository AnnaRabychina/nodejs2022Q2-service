import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IAlbum } from 'src/modules/albums/album.interface';
import { AlbumService } from 'src/modules/albums/services/album.service';
import { IArtist } from 'src/modules/artists/artist.interface';
import { ArtistService } from 'src/modules/artists/services/artist.service';
import { TrackService } from 'src/modules/tracks/services/track.service';
import { ITrack } from 'src/modules/tracks/track.interface';
import { IFavorites, IFavoritesResponses } from '../favorites.interface';

@Injectable()
export class FavoritesService {
  private static favorites: IFavorites = {
    artistsIds: [],
    albumsIds: [],
    tracksIds: [],
  };

  public async getFavorites(): Promise<IFavoritesResponses> {
    const { artistsIds, albumsIds, tracksIds } = FavoritesService.favorites;
    const artists = ArtistService.artists.filter((artist) =>
      artistsIds.includes(artist.id),
    );
    const albums = AlbumService.albums.filter((album) =>
      albumsIds.includes(album.id),
    );
    const tracks = TrackService.tracks.filter((track) =>
      tracksIds.includes(track.id),
    );
    return { artists, albums, tracks };
  }

  public async addToFavorites(
    type: string,
    id: string,
  ): Promise<IArtist | IAlbum | ITrack> {
    switch (type) {
      case 'artist':
        const artist = ArtistService.artists.find((artist) => artist.id === id);
        if (!artist) {
          throw new UnprocessableEntityException('Artist not found');
        } else {
          FavoritesService.favorites.artistsIds.push(id);
          return artist;
        }
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
      case 'artist':
        const artist = FavoritesService.favorites.artistsIds.find(
          (artist) => artist === id,
        );
        if (!artist) {
          throw new NotFoundException('Artist not found');
        } else {
          FavoritesService.favorites.artistsIds =
            FavoritesService.favorites.artistsIds.filter(
              (artistId) => artistId !== id,
            );
        }
        break;
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
