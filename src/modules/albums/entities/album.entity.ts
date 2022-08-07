import { ArtistEntity } from 'src/modules/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;
}
