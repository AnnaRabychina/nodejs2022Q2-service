import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
