import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum NewsStatus {
  ACTIVE = 'ACTIVE',
  HIDDEN = 'HIDDEN',
  FAKE = 'FAKE',
}

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  cover: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  fullText: string;

  @Column({ type: 'enum', enum: NewsStatus })
  status: NewsStatus;

  @Column({ type: 'int' })
  creatorId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
