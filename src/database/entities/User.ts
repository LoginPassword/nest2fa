import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
@Unique(['phone'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 100 })
  phone: string;

  @Column({ length: 100 })
  passwordHash: string;

  @Column({ type: 'enum', enum: ['user', 'moderator', 'admin'] })
  role: 'user' | 'moderator' | 'admin';

  @Column({ type: 'enum', enum: ['active', 'ban'] })
  status: 'active' | 'ban';
}
