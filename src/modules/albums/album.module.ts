import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AlbumController } from './controllers/album.controller';
import { AlbumEntity } from './entities/album.entity';
import { AlbumService } from './services/album.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), AuthModule],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
