import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateForwardingDto {
  @IsOptional()
  @IsString()
  aluno?: string;

  @IsOptional()
  @IsDateString()
  dataAdmissao?: string;

  @IsOptional()
  @IsString()
  empresa?: string;

  @IsOptional()
  @IsString()
  funcao?: string;

  @IsOptional()
  @IsString()
  contatoRH?: string;

  @IsOptional()
  @IsDateString()
  dataDesligamento?: string;
}
