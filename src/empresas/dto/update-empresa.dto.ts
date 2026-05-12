import { IsOptional, IsString } from 'class-validator';
import { IsValidCNPJ } from '../validators/is-valid-cnpj.decorator';

export class UpdateEmpresaDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  nome_fantasia?: string;

  @IsOptional()
  @IsString()
  razao_social?: string;

  @IsOptional()
  @IsString()
  @IsValidCNPJ({ message: 'CNPJ inválido (dígitos verificadores incorretos)' })
  cnpj?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  contato_rh_nome?: string;

  @IsOptional()
  @IsString()
  contato_rh_email?: string;

  @IsOptional()
  @IsString()
  createdAt?: string;
}
