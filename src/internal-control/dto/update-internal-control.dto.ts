import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateInternalControlDto {
  @IsOptional()
  @IsString()
  aluno?: string;

  @IsOptional()
  @IsDateString()
  ingresso?: string;

  @IsOptional()
  @IsDateString()
  primeiraAvaliacao?: string;

  @IsOptional()
  @IsDateString()
  segundaAvaliacao?: string;

  @IsOptional()
  @IsDateString()
  primeiraEntrevista?: string;

  @IsOptional()
  @IsDateString()
  segundaEntrevista?: string;

  @IsOptional()
  @IsString()
  resultado?: string;
}
