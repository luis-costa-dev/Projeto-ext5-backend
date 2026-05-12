import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('empresas')
export class Empresa {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', { length: 255 })
  nome_fantasia: string;

  @Column('varchar', { length: 255 })
  razao_social: string;

  @Column('varchar', { length: 64, nullable: true })
  cnpj?: string;

  @Column('text', { nullable: true })
  endereco?: string;

  @Column('varchar', { length: 64, nullable: true })
  telefone?: string;

  @Column('varchar', { length: 255, nullable: true })
  contato_rh_nome?: string;

  @Column('varchar', { length: 255, nullable: true })
  contato_rh_email?: string;

  @CreateDateColumn()
  createdAt: Date;
}
