import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/modules/artists/entities/artist.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { AlbumEntity } from '../entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  public async getAllAlbums() {
    return await this.artistRepository.find();
  }

  public async getAlbumById(albumId: string) {
    const album = await this.artistRepository.findOne({
      where: { id: albumId },
    });
    if (!album)
      throw new NotFoundException(`Album with id = ${albumId} was not found`);
    return album;
  }

  public async createAlbum(albumDto: CreateAlbumDto) {
    const newAlbum = this.artistRepository.create(albumDto);
    return this.artistRepository.save(newAlbum);
  }

  public async updateAlbum(albumId: string, albumDto: CreateAlbumDto) {
    const updatedAlbum = await this.artistRepository.findOne({
      where: { id: albumId },
    });
    if (!updatedAlbum) {
      throw new NotFoundException(`Album with id = ${albumId} was not found`);
    }
    return await this.artistRepository.save({ ...updatedAlbum, ...albumDto });
  }

  public async deleteAlbum(albumId: string) {
    const result = await this.artistRepository.delete(albumId);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with id = ${albumId} was not found`);
    }
  }
}
