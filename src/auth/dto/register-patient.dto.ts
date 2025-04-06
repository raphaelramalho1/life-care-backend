import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterPatientDto {
  @ApiProperty({ description: 'Nome completo do paciente' })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @ApiProperty({ description: 'Email do paciente (opcional)' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  email?: string;

  @ApiProperty({ description: 'Data de nascimento do paciente' })
  @IsString({ message: 'Data de nascimento deve ser uma string' })
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  birthDate: string;
}
