import { IAlbum } from '../albums/album.interface';
import { IArtist } from '../artists/artist.interface';
import { ITrack } from '../tracks/track.interface';

export interface IFavorites {
  artistsIds?: string[];
  albumsIds?: string[];
  tracksIds?: string[];
}

export interface IFavoritesResponses {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
