import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { IArtist } from '../artist.interface';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { v4 as uuid4 } from 'uuid';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getArtists(): Promise<IArtist[]> {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getArtist(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IArtist> {
    return this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<IArtist> {
    return this.artistService.createArtist({
      ...createArtistDto,
      id: uuid4(),
    });
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist> {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteArtist(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IArtist> {
    return this.artistService.deleteArtist(id);
  }
}
