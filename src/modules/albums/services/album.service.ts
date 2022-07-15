import { Injectable, NotFoundException } from '@nestjs/common';
import { IAlbum } from '../album.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class AlbumService {
  private static albums: IAlbum[] = [];

  public async getAllAlbums(): Promise<IAlbum[]> {
    return AlbumService.albums;
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    const album = AlbumService.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return album;
    }
  }

  public async createAlbum(album: IAlbum): Promise<IAlbum> {
    const newAlbum = { ...album, id: uuid4() };
    AlbumService.albums.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(id: string, album: IAlbum): Promise<IAlbum> {
    const updatedAlbum = { ...album, id };
    const index = AlbumService.albums.findIndex((album) => album.id === id);
    if (!AlbumService.albums[index]) {
      throw new NotFoundException('Album not found');
    } else {
      AlbumService.albums[index] = updatedAlbum;
      return updatedAlbum;
    }
  }

  public async deleteAlbum(id: string): Promise<IAlbum> {
    const album = AlbumService.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      AlbumService.albums.splice(AlbumService.albums.indexOf(album), 1);
      return album;
    }
  }

  public async deleteArtistIdById(artistId: string): Promise<void> {
    AlbumService.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
