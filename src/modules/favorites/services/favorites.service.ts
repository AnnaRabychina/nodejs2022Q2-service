import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumService } from 'src/modules/albums/services/album.service';
import { ArtistService } from 'src/modules/artists/services/artist.service';
import { TrackService } from 'src/modules/tracks/services/track.service';
import { Repository } from 'typeorm';
import { FavoritesEntity } from '../entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  public async getFavorites() {
    const favorites = await this.favoritesRepository.find();

    const artistsIds = favorites
      .filter((favorite) => favorite.type === 'artist')
      .map((favorite) => favorite.typeId);
    const artists = (await this.artistService.getAllArtists()).filter(
      (artist) => artistsIds.includes(artist.id),
    );

    const albumsIds = favorites
      .filter((favorite) => favorite.type === 'album')
      .map((favorite) => favorite.typeId);
    const albums = (await this.albumService.getAllAlbums()).filter((album) =>
      albumsIds.includes(album.id),
    );

    const tracksIds = favorites
      .filter((favorite) => favorite.type === 'track')
      .map((favorite) => favorite.typeId);
    const tracks = (await this.trackService.getAllTracks()).filter((track) =>
      tracksIds.includes(track.id),
    );

    return { artists, albums, tracks };
  }

  public async addToFavorites(type: string, id: string) {
    switch (type) {
      case 'artist':
        const artist = (await this.artistService.getAllArtists()).find(
          (artist) => artist.id === id,
        );
        if (!artist)
          throw new UnprocessableEntityException(
            `Artist with id ${id} not found`,
          );
        await this.favoritesRepository.save({
          type: 'artist',
          typeId: artist.id,
        });
        return artist;

      case 'album':
        const album = (await this.albumService.getAllAlbums()).find(
          (album) => album.id === id,
        );
        if (!album)
          throw new UnprocessableEntityException(
            `Album with id ${id} not found`,
          );
        await this.favoritesRepository.save({
          type: 'album',
          typeId: album.id,
        });
        return album;

      case 'track':
        const track = (await this.trackService.getAllTracks()).find(
          (track) => track.id === id,
        );
        if (!track)
          throw new UnprocessableEntityException(
            `Track with id ${id} not found`,
          );
        await this.favoritesRepository.save({
          type: 'track',
          typeId: track.id,
        });
        return track;

      default:
        throw new UnprocessableEntityException('Invalid type');
    }
  }

  public async deleteFromFavorites(type: string, id: string): Promise<void> {
    switch (type) {
      case 'artist':
        const currentArtist = await this.favoritesRepository.findOneBy({
          typeId: id,
        });
        if (!currentArtist)
          throw new UnprocessableEntityException(`Artist with ${id} not found`);
        await this.favoritesRepository.remove(currentArtist);
        break;

      case 'album':
        const currentAlbum = await this.favoritesRepository.findOneBy({
          typeId: id,
        });
        if (!currentAlbum)
          throw new UnprocessableEntityException(`Album with ${id} not found`);
        await this.favoritesRepository.remove(currentAlbum);
        break;

      case 'track':
        const currentTrack = await this.favoritesRepository.findOneBy({
          typeId: id,
        });
        if (!currentTrack)
          throw new UnprocessableEntityException(`Track with ${id} not found`);
        await this.favoritesRepository.remove(currentTrack);
        break;

      default:
        throw new UnprocessableEntityException('Invalid type');
    }
  }
}
