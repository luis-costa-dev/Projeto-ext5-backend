import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Pessoa } from '../pessoas/pessoa.entity';

@Entity('avaliacoes')
export class Avaliacao {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  pessoa_id: number;

  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE' })
  pessoa: Pessoa;

  @Column({ type: 'date' })
  data_avaliacao: string;

  @Column()
  tipo: 'inicial' | 'acompanhamento';

  @Column({ nullable: true })
  professor_responsavel: string;

  @Column({ nullable: true })
  q01: string;

  @Column({ nullable: true })
  q02: string;

  @Column({ nullable: true })
  q03: string;

  @Column({ nullable: true })
  q04: string;

  @Column({ nullable: true })
  q05: string;

  @Column({ nullable: true })
  q06: string;

  @Column({ nullable: true })
  q07: string;

  @Column({ nullable: true })
  q08: string;

  @Column({ nullable: true })
  q09: string;

  @Column({ nullable: true })
  q10: string;

  @Column({ nullable: true })
  q11: string;

  @Column({ nullable: true })
  q12: string;

  @Column({ nullable: true })
  q13: string;

  @Column({ nullable: true })
  q14: string;

  @Column({ nullable: true })
  q15: string;

  @Column({ nullable: true })
  q16: string;

  @Column({ nullable: true })
  q17: string;

  @Column({ nullable: true })
  q18: string;

  @Column({ nullable: true })
  q19: string;

  @Column({ nullable: true })
  q20: string;

  @Column({ nullable: true })
  q21: string;

  @Column({ nullable: true })
  q22: string;

  @Column({ nullable: true })
  q23: string;

  @Column({ nullable: true })
  q24: string;

  @Column({ nullable: true })
  q25: string;

  @Column({ nullable: true })
  q26: string;

  @Column({ nullable: true })
  q27: string;

  @Column({ nullable: true })
  q28: string;

  @Column({ nullable: true })
  q29: string;

  @Column({ nullable: true })
  q30: string;

  @Column({ nullable: true })
  q31: string;

  @Column({ nullable: true })
  q32: string;

  @Column({ nullable: true })
  q33: string;

  @Column({ nullable: true })
  q34: string;

  @Column({ nullable: true })
  q35: string;

  @Column({ nullable: true })
  q36: string;

  @Column({ nullable: true })
  q37: string;

  @Column({ nullable: true })
  q38: string;

  @Column({ nullable: true })
  q39: string;

  @Column({ nullable: true })
  q40: string;

  @Column({ nullable: true })
  q41: string;

  @Column({ nullable: true })
  q42: string;

  @Column({ nullable: true })
  q43: string;

  @Column({ nullable: true })
  q44: string;

  @Column({ nullable: true })
  q45: string;

  @Column({ nullable: true })
  q46: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
