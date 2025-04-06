import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({ description: 'Email do usuário' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({ description: 'Código de verificação enviado por email' })
  @IsString({ message: 'Código de verificação deve ser uma string' })
  @IsNotEmpty({ message: 'Código de verificação é obrigatório' })
  @Length(6, 6, { message: 'Código de verificação deve ter 6 caracteres' })
  token: string;
}
