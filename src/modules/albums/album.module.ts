import { Module } from '@nestjs/common';
import { AlbumController } from './controllers/album.controller';
import { AlbumService } from './services/album.service';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
