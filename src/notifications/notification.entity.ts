import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 500 })
  title: string;

  @Column('timestamp')
  when: string;

  @Column('boolean', { default: false })
  read: boolean;

  @Column('text', { nullable: true })
  body?: string;

  @CreateDateColumn()
  createdAt: Date;
}
