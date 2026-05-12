import {
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsIn,
  Length,
  IsEmail,
} from 'class-validator';
import { IsValidCPF } from '../validators/is-valid-cpf.decorator';

export class UpdatePessoaDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nome?: string;

  @IsOptional()
  @IsDateString()
  data_nascimento?: string | Date;

  @IsOptional()
  @IsDateString()
  data_entrada?: string | Date;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  telefone?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  nome_responsavel?: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  telefone_responsavel?: string;

  @IsOptional()
  @IsBoolean()
  usa_medicamento?: boolean;

  @IsOptional()
  @IsString()
  info_medicamentos?: string;

  @IsOptional()
  @IsIn(['ativo', 'inativo'])
  status?: 'ativo' | 'inativo';

  @IsOptional()
  @IsString()
  @IsValidCPF({ message: 'CPF inválido (dígitos verificadores incorretos)' })
  cpf?: string;

  @IsOptional()
  @IsEmail()
  @Length(0, 254)
  email?: string;

  @IsOptional()
  @IsString()
  pcd?: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
