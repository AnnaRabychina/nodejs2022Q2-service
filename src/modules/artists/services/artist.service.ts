import { Injectable, NotFoundException } from '@nestjs/common';
import { IArtist } from '../artist.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class ArtistService {
  static artists: IArtist[] = [];

  public async getAllArtists(): Promise<IArtist[]> {
    return ArtistService.artists;
  }

  public async getArtistById(id: string): Promise<IArtist> {
    const artist = ArtistService.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      return artist;
    }
  }

  public async createArtist(artist: IArtist): Promise<IArtist> {
    const newArtist = { ...artist, id: uuid4() };
    ArtistService.artists.push(newArtist);
    return newArtist;
  }

  public async updateArtist(id: string, artist: IArtist): Promise<IArtist> {
    const updatedArtist = { ...artist, id };
    const index = ArtistService.artists.findIndex((artist) => artist.id === id);
    if (!ArtistService.artists[index]) {
      throw new NotFoundException('Artist not found');
    } else {
      ArtistService.artists[index] = updatedArtist;
      return updatedArtist;
    }
  }

  public async deleteArtist(id: string): Promise<IArtist> {
    const artist = ArtistService.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      ArtistService.artists.splice(ArtistService.artists.indexOf(artist), 1);
      return artist;
    }
  }
}
