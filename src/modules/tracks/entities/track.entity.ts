import { AlbumEntity } from 'src/modules/albums/entities/album.entity';
import { ArtistEntity } from 'src/modules/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  albumId: string;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  album: AlbumEntity;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;
}
