import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn({ default: 1 })
  version: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return {
      id,
      login,
      version,
      createdAt: +new Date(createdAt),
      updatedAt: +updatedAt,
    };
  }
}
