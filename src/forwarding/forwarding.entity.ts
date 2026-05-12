import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('forwarding')
export class Forwarding {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', { length: 255 })
  aluno: string;

  @Column('date')
  dataAdmissao: string;

  @Column('varchar', { length: 255 })
  empresa: string;

  @Column('varchar', { length: 255 })
  funcao: string;

  @Column('varchar', { length: 255 })
  contatoRH: string;

  @Column('date', { nullable: true })
  dataDesligamento: string;

  @CreateDateColumn()
  createdAt: Date;
}
