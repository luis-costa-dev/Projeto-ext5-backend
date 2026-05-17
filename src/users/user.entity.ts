import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('varchar', { length: 50 })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('varchar', { length: 10, nullable: true })
  resetCode: string | null;

  @Column('timestamp', { nullable: true })
  resetCodeExpiresAt: Date | null;

  @Column('boolean', { default: false })
  approved: boolean;
}
