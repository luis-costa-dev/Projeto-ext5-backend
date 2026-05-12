import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pessoas')
export class Pessoa {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @Column({ length: 100 })
  nome!: string;

  @Column({ type: 'date', name: 'data_nascimento' })
  data_nascimento!: Date;

  @Column({ type: 'date', name: 'data_entrada' })
  data_entrada!: Date;

  @Column({ length: 20, nullable: true })
  telefone?: string;

  @Column({ length: 100, nullable: true, name: 'nome_responsavel' })
  nome_responsavel?: string;

  @Column({ length: 20, nullable: true, name: 'telefone_responsavel' })
  telefone_responsavel?: string;

  @Column({ type: 'boolean', default: false, name: 'usa_medicamento' })
  usa_medicamento!: boolean;

  @Column({ type: 'text', nullable: true, name: 'info_medicamentos' })
  info_medicamentos?: string;

  @Column({ type: 'varchar', length: 20, enum: ['ativo', 'inativo'] })
  status!: 'ativo' | 'inativo';

  @Column({ length: 14, nullable: true })
  cpf?: string;

  @Column({ length: 254, nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  pcd?: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at!: Date;
}
