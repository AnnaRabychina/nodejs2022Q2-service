import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  artistId: string | null;

  @IsOptional()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
