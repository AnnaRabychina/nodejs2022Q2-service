import { IsOptional } from 'class-validator';

export class UpdateFavoritesDto {
  @IsOptional()
  artists: string[];

  @IsOptional()
  albums: string[];

  @IsOptional()
  tracks: string[];
}
