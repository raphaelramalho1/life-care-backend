import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
  })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'Senha@123' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Função do usuário no sistema',
    enum: UserRole,
    example: UserRole.PATIENT,
    default: UserRole.PATIENT,
    required: false
  })
  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Função inválida. Deve ser: admin, patient ou caregiver',
  })
  role?: UserRole;

  @ApiProperty({
    description: 'Indica se o email do usuário foi verificado',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'O status de verificação de email deve ser um booleano',
  })
  isEmailVerified?: boolean;

  @ApiProperty({
    description: 'PIN para login simplificado (apenas para pacientes)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O PIN deve ser uma string' })
  pin?: string;
}
