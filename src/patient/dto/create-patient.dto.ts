import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ description: 'ID do usuário associado ao paciente' })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  @IsUUID('4', { message: 'ID de usuário inválido' })
  userId: string;

  @ApiProperty({ description: 'Idade do paciente', example: 75 })
  @IsNotEmpty({ message: 'A idade é obrigatória' })
  @IsNumber({}, { message: 'A idade deve ser um número' })
  @Min(0, { message: 'A idade não pode ser negativa' })
  age: number;

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
  })
  @IsNotEmpty({ message: 'O contato de emergência é obrigatório' })
  @IsString({ message: 'O contato de emergência deve ser uma string' })
  emergencyContact: string;

  @ApiProperty({
    description: 'Telefone do contato de emergência',
    example: '(11) 98765-4321',
  })
  @IsNotEmpty({ message: 'O telefone de emergência é obrigatório' })
  @IsString({ message: 'O telefone de emergência deve ser uma string' })
  emergencyPhone: string;

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
