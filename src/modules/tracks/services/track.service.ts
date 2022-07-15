import { Injectable, NotFoundException } from '@nestjs/common';
import { ITrack } from '../track.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class TrackService {
  private readonly tracks: ITrack[] = [];

  public async getAllTracks(): Promise<ITrack[]> {
    return this.tracks;
  }

  public async getTrackById(id: string): Promise<ITrack> {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      return track;
    }
  }

  public async createTrack(track: ITrack): Promise<ITrack> {
    const newTrack = { ...track, id: uuid4() };
    this.tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(id: string, track: ITrack): Promise<ITrack> {
    const updatedTrack = { ...track, id };
    const index = this.tracks.findIndex((track) => track.id === id);
    if (!this.tracks[index]) {
      throw new NotFoundException('Track not found');
    } else {
      this.tracks[index] = updatedTrack;
      return updatedTrack;
    }
  }

  public async deleteTrack(id: string): Promise<ITrack> {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      this.tracks.splice(this.tracks.indexOf(track), 1);
      return track;
    }
  }
}
