import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateForwardingDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  aluno: string;

  @IsNotEmpty()
  @IsDateString()
  dataAdmissao: string;

  @IsNotEmpty()
  @IsString()
  empresa: string;

  @IsNotEmpty()
  @IsString()
  funcao: string;

  @IsNotEmpty()
  @IsString()
  contatoRH: string;

  @IsOptional()
  @IsDateString()
  dataDesligamento?: string;
}
