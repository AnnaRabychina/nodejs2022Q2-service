import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { AlbumEntity } from '../entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  public async getAllAlbums() {
    return await this.albumRepository.find();
  }

  public async getAlbumById(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album)
      throw new NotFoundException(`Album with id = ${albumId} was not found`);
    return album;
  }

  public async createAlbum(albumDto: CreateAlbumDto) {
    const newAlbum = this.albumRepository.create(albumDto);
    return this.albumRepository.save(newAlbum);
  }

  public async updateAlbum(albumId: string, albumDto: CreateAlbumDto) {
    const updatedAlbum = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!updatedAlbum) {
      throw new NotFoundException(`Album with id = ${albumId} was not found`);
    }
    return await this.albumRepository.save({ ...updatedAlbum, ...albumDto });
  }

  public async deleteAlbum(albumId: string) {
    const result = await this.albumRepository.delete(albumId);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with id = ${albumId} was not found`);
    }
  }
}
