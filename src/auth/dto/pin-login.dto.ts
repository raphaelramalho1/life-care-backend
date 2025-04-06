import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class PinLoginDto {
  @ApiProperty({ description: 'PIN de acesso do paciente' })
  @IsString({ message: 'PIN deve ser uma string' })
  @IsNotEmpty({ message: 'PIN é obrigatório' })
  @Length(6, 6, { message: 'PIN deve ter 6 caracteres' })
  pin: string;
}
