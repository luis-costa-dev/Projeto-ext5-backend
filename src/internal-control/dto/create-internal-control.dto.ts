import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateInternalControlDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  aluno: string;

  @IsNotEmpty()
  @IsDateString()
  ingresso: string;

  @IsNotEmpty()
  @IsDateString()
  primeiraAvaliacao: string;

  @IsNotEmpty()
  @IsDateString()
  segundaAvaliacao: string;

  @IsNotEmpty()
  @IsDateString()
  primeiraEntrevista: string;

  @IsNotEmpty()
  @IsDateString()
  segundaEntrevista: string;

  @IsNotEmpty()
  @IsString()
  resultado: string;
}
