import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('favorite')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  typeId: string;
}
