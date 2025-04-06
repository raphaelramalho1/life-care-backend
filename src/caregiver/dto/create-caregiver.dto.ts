import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateCaregiverDto {
  @ApiProperty({ description: 'ID do usuário associado ao cuidador' })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  @IsUUID('4', { message: 'ID de usuário inválido' })
  userId: string;

  @ApiProperty({
    description: 'Especialização do cuidador',
    example: 'Geriatria',
  })
  @IsNotEmpty({ message: 'A especialização é obrigatória' })
  @IsString({ message: 'A especialização deve ser uma string' })
  specialization: string;

  @ApiProperty({ description: 'Anos de experiência do cuidador', example: 5 })
  @IsNotEmpty({ message: 'Os anos de experiência são obrigatórios' })
  @IsNumber({}, { message: 'Os anos de experiência devem ser um número' })
  @Min(0, { message: 'Os anos de experiência não podem ser negativos' })
  yearsOfExperience: number;

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
}
