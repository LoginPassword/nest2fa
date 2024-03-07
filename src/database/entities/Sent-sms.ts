import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity()
@Unique(['phone', 'code'])
export class SentSms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  phone: string;

  @Column({ type: 'int' })
  code: number;

  @Column({ type: 'boolean' })
  used: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
