import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  public async getAllArtists() {
    return await this.artistRepository.find();
  }

  public async getArtistById(artistId: string) {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!artist)
      throw new NotFoundException(`Artist with id = ${artistId} was not found`);
    return artist;
  }

  public async createArtist(artistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create(artistDto);
    return this.artistRepository.save(newArtist);
  }

  public async updateArtist(artistId: string, artistDto: UpdateArtistDto) {
    const updatedArtist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!updatedArtist) {
      throw new NotFoundException(`Artist with id = ${artistId} was not found`);
    }
    return await this.artistRepository.save({ ...updatedArtist, ...artistDto });
  }

  public async deleteArtist(artistId: string) {
    const result = await this.artistRepository.delete(artistId);
    if (result.affected === 0) {
      throw new NotFoundException(`Artist with id = ${artistId} was not found`);
    }
  }
}
