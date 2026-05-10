
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('app_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'user_role', default: 'customer' })
  role: string;
}