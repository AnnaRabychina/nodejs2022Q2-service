import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFavoritesDto {
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
