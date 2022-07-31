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
import { ITrack } from '../track.interface';
import { v4 as uuid4 } from 'uuid';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getTracks(): Promise<ITrack[]> {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getTrack(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ITrack> {
    return this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createTrack(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<ITrack> {
    return this.trackService.createTrack({
      ...createTrackDto,
      id: uuid4(),
    });
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTrack(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ITrack> {
    return this.trackService.deleteTrack(id);
  }
}
