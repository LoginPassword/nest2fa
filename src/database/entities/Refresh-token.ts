import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity()
@Unique(['userId'])
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ length: 500 })
  token: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
