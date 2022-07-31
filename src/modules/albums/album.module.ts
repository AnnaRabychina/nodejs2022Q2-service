import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from './controllers/album.controller';
import { AlbumEntity } from './entities/album.entity';
import { AlbumService } from './services/album.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
