import { Injectable, NotFoundException } from '@nestjs/common';
import { IAlbum } from '../album.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class AlbumService {
  private readonly albums: IAlbum[] = [];

  public async getAllAlbums(): Promise<IAlbum[]> {
    return this.albums;
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return album;
    }
  }

  public async createAlbum(album: IAlbum): Promise<IAlbum> {
    const newAlbum = { ...album, id: uuid4() };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(id: string, album: IAlbum): Promise<IAlbum> {
    const updatedAlbum = { ...album, id };
    const index = this.albums.findIndex((album) => album.id === id);
    if (!this.albums[index]) {
      throw new NotFoundException('Album not found');
    } else {
      this.albums[index] = updatedAlbum;
      return updatedAlbum;
    }
  }

  public async deleteAlbum(id: string): Promise<IAlbum> {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      this.albums.splice(this.albums.indexOf(album), 1);
      return album;
    }
  }
}
