import { Injectable } from '@nestjs/common';
import { IArtist } from '../artist.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class ArtistService {
  private readonly artists: IArtist[] = [];

  public async getAllArtists(): Promise<IArtist[]> {
    return this.artists;
  }

  public async getArtistById(id: string): Promise<IArtist> {
    return this.artists.find((artist) => artist.id === id);
  }

  public async createArtist(artist: IArtist): Promise<IArtist> {
    const newArtist = { ...artist, id: uuid4() };
    this.artists.push(newArtist);
    return newArtist;
  }

  public async updateArtist(id: string, artist: IArtist): Promise<IArtist> {
    const updatedArtist = { ...artist, id };
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists[index] = updatedArtist;
    return updatedArtist;
  }

  public async deleteArtist(id: string): Promise<IArtist> {
    const artist = this.artists.find((artist) => artist.id === id);
    this.artists.splice(this.artists.indexOf(artist), 1);
    return artist;
  }
}
