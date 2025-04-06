import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePatientDto {
  @ApiProperty({
    description: 'Idade do paciente',
    example: 75,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A idade deve ser um número' })
  @Min(0, { message: 'A idade não pode ser negativa' })
  age?: number;

  @ApiProperty({
    description: 'Condição médica do paciente',
    example: 'Hipertensão, Diabetes',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'A condição médica deve ser uma string' })
  medicalCondition?: string;

  @ApiProperty({
    description: 'Nome do contato de emergência',
    example: 'Maria Silva',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O contato de emergência deve ser uma string' })
  emergencyContact?: string;

  @ApiProperty({
    description: 'Telefone do contato de emergência',
    example: '(11) 98765-4321',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O telefone de emergência deve ser uma string' })
  emergencyPhone?: string;

  @ApiProperty({
    description: 'Endereço do paciente',
    example: 'Rua das Flores, 123',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O endereço deve ser uma string' })
  address?: string;

  @ApiProperty({
    description: 'Observações sobre o paciente',
    example: 'Prefere refeições leves no jantar',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'As observações devem ser uma string' })
  notes?: string;
}
