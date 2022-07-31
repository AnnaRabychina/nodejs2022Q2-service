import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  artistId: string | null;
}
