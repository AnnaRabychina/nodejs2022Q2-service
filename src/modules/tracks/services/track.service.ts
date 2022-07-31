import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  public async getAllTracks() {
    return await this.trackRepository.find();
  }

  public async getTrackById(trackId: string) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!track)
      throw new NotFoundException(`Track with id = ${trackId} was not found`);
    return track;
  }

  public async createTrack(trackDto: CreateTrackDto) {
    const newTrack = this.trackRepository.create(trackDto);
    return this.trackRepository.save(newTrack);
  }

  public async updateTrack(trackId: string, trackDto: UpdateTrackDto) {
    const updatedTrack = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!updatedTrack) {
      throw new NotFoundException(`Track with id = ${trackId} was not found`);
    }
    return await this.trackRepository.save({ ...updatedTrack, ...trackDto });
  }

  public async deleteTrack(trackId: string) {
    const result = await this.trackRepository.delete(trackId);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with id = ${trackId} was not found`);
    }
  }
}
