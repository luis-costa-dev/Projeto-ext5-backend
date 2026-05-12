import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString, IsIn } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsNotEmpty()
  @IsNumber()
  pessoa_id: number;

  @IsNotEmpty()
  @IsDateString()
  data_avaliacao: string;

  @IsNotEmpty()
  @IsIn(['inicial', 'acompanhamento'])
  tipo: 'inicial' | 'acompanhamento';

  @IsOptional()
  @IsString()
  professor_responsavel?: string;

  @IsOptional()
  @IsString()
  q01?: string;

  @IsOptional()
  @IsString()
  q02?: string;

  @IsOptional()
  @IsString()
  q03?: string;

  @IsOptional()
  @IsString()
  q04?: string;

  @IsOptional()
  @IsString()
  q05?: string;

  @IsOptional()
  @IsString()
  q06?: string;

  @IsOptional()
  @IsString()
  q07?: string;

  @IsOptional()
  @IsString()
  q08?: string;

  @IsOptional()
  @IsString()
  q09?: string;

  @IsOptional()
  @IsString()
  q10?: string;

  @IsOptional()
  @IsString()
  q11?: string;

  @IsOptional()
  @IsString()
  q12?: string;

  @IsOptional()
  @IsString()
  q13?: string;

  @IsOptional()
  @IsString()
  q14?: string;

  @IsOptional()
  @IsString()
  q15?: string;

  @IsOptional()
  @IsString()
  q16?: string;

  @IsOptional()
  @IsString()
  q17?: string;

  @IsOptional()
  @IsString()
  q18?: string;

  @IsOptional()
  @IsString()
  q19?: string;

  @IsOptional()
  @IsString()
  q20?: string;

  @IsOptional()
  @IsString()
  q21?: string;

  @IsOptional()
  @IsString()
  q22?: string;

  @IsOptional()
  @IsString()
  q23?: string;

  @IsOptional()
  @IsString()
  q24?: string;

  @IsOptional()
  @IsString()
  q25?: string;

  @IsOptional()
  @IsString()
  q26?: string;

  @IsOptional()
  @IsString()
  q27?: string;

  @IsOptional()
  @IsString()
  q28?: string;

  @IsOptional()
  @IsString()
  q29?: string;

  @IsOptional()
  @IsString()
  q30?: string;

  @IsOptional()
  @IsString()
  q31?: string;

  @IsOptional()
  @IsString()
  q32?: string;

  @IsOptional()
  @IsString()
  q33?: string;

  @IsOptional()
  @IsString()
  q34?: string;

  @IsOptional()
  @IsString()
  q35?: string;

  @IsOptional()
  @IsString()
  q36?: string;

  @IsOptional()
  @IsString()
  q37?: string;

  @IsOptional()
  @IsString()
  q38?: string;

  @IsOptional()
  @IsString()
  q39?: string;

  @IsOptional()
  @IsString()
  q40?: string;

  @IsOptional()
  @IsString()
  q41?: string;

  @IsOptional()
  @IsString()
  q42?: string;

  @IsOptional()
  @IsString()
  q43?: string;

  @IsOptional()
  @IsString()
  q44?: string;

  @IsOptional()
  @IsString()
  q45?: string;

  @IsOptional()
  @IsString()
  q46?: string;
}
