import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('internal_control')
export class InternalControl {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', { length: 255 })
  aluno: string;

  @Column('date')
  ingresso: string;

  @Column('date')
  primeiraAvaliacao: string;

  @Column('date')
  segundaAvaliacao: string;

  @Column('date')
  primeiraEntrevista: string;

  @Column('date')
  segundaEntrevista: string;

  @Column('varchar', { length: 100 })
  resultado: string;

  @CreateDateColumn()
  createdAt: Date;
}
