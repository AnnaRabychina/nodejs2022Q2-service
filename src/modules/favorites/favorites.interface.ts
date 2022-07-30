import { IAlbum } from '../albums/album.interface';
import { ITrack } from '../tracks/track.interface';

export interface IFavorites {
  artistsIds?: string[];
  albumsIds?: string[];
  tracksIds?: string[];
}

export interface IFavoritesResponses {
  albums: IAlbum[];
  tracks: ITrack[];
}
