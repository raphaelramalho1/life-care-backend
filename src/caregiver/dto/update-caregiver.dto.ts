import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateCaregiverDto {
  @ApiProperty({
    description: 'Especialização do cuidador',
    example: 'Geriatria',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'A especialização deve ser uma string' })
  specialization?: string;

  @ApiProperty({
    description: 'Anos de experiência do cuidador',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Os anos de experiência devem ser um número' })
  @Min(0, { message: 'Os anos de experiência não podem ser negativos' })
  yearsOfExperience?: number;

  @ApiProperty({
    description: 'Biografia do cuidador',
    example: 'Profissional com experiência em cuidados geriátricos...',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'A biografia deve ser uma string' })
  biography?: string;

  @ApiProperty({
    description: 'Certificações do cuidador',
    example: 'Técnico em Enfermagem, Especialização em Cuidados Paliativos',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'As certificações devem ser uma string' })
  certifications?: string;

  @ApiProperty({
    description: 'Disponibilidade do cuidador',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'A disponibilidade deve ser um booleano' })
  isAvailable?: boolean;
}
