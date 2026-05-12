import { IsNotEmpty, IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsDateString()
  when!: string;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsBoolean()
  read?: boolean;
}
