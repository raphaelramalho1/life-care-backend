import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Senha@123',
    required: false,
  })
  @IsOptional()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password?: string;

  @ApiProperty({
    description: 'Função do usuário no sistema',
    enum: UserRole,
    example: UserRole.PATIENT,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Função inválida. Deve ser: admin, patient ou caregiver',
  })
  role?: UserRole;

  @ApiProperty({
    description: 'Status de verificação do email',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'O status de verificação deve ser um booleano' })
  isEmailVerified?: boolean;

  @ApiProperty({
    description: 'Token de verificação de email',
    example: '123456',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O token de verificação deve ser uma string' })
  verificationToken?: string;

  @ApiProperty({
    description: 'Data de expiração do token de verificação',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  verificationTokenExpires?: Date;

  @ApiProperty({
    description: 'PIN para login simplificado (apenas para pacientes)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O PIN deve ser uma string' })
  pin?: string;
}
