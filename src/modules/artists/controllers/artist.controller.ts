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
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getArtists() {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.deleteArtist(id);
  }
}
