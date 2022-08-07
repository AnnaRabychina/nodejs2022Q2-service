import { Module } from '@nestjs/common';
import { TrackService } from './services/track.service';
import { TrackController } from './controllers/track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]), AuthModule],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
