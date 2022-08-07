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
  UseGuards,
} from '@nestjs/common';
import { AlbumService } from '../services/album.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
