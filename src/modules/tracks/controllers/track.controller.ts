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
import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackService } from '../services/track.service';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getTracks() {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.deleteTrack(id);
  }
}
