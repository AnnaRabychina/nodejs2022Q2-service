import { Injectable, NotFoundException } from '@nestjs/common';
import { ITrack } from '../track.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class TrackService {
  private static tracks: ITrack[] = [];

  public async getAllTracks(): Promise<ITrack[]> {
    return TrackService.tracks;
  }

  public async getTrackById(id: string): Promise<ITrack> {
    const track = TrackService.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      return track;
    }
  }

  public async createTrack(track: ITrack): Promise<ITrack> {
    const newTrack = { ...track, id: uuid4() };
    TrackService.tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(id: string, track: ITrack): Promise<ITrack> {
    const updatedTrack = { ...track, id };
    const index = TrackService.tracks.findIndex((track) => track.id === id);
    if (!TrackService.tracks[index]) {
      throw new NotFoundException('Track not found');
    } else {
      TrackService.tracks[index] = updatedTrack;
      return updatedTrack;
    }
  }

  public async deleteTrack(id: string): Promise<ITrack> {
    const track = TrackService.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      TrackService.tracks.splice(TrackService.tracks.indexOf(track), 1);
      return track;
    }
  }

  public async deleteArtistIdById(artistId: string): Promise<void> {
    TrackService.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  public async deleteAlbumIdById(albumId: string): Promise<void> {
    TrackService.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
