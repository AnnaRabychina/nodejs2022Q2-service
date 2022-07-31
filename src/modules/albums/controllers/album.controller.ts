import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { IAlbum } from '../album.interface';
import { AlbumService } from '../services/album.service';
import { v4 as uuid4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { TrackService } from 'src/modules/tracks/services/track.service';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAlbums(): Promise<IAlbum[]> {
    return this.albumService.getAllAlbums();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getAlbum(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IAlbum> {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<IAlbum> {
    return this.albumService.createAlbum({
      ...createAlbumDto,
      id: uuid4(),
    });
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IAlbum> {
    this.trackService.deleteAlbumIdById(id);
    return this.albumService.deleteAlbum(id);
  }
}
