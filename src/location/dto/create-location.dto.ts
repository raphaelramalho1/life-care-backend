// src/location/dto/create-location.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    description: 'Latitude da localização',
    example: -23.5505,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Latitude é obrigatória' })
  latitude: number;

  @ApiProperty({
    description: 'Longitude da localização',
    example: -46.6333,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Longitude é obrigatória' })
  longitude: number;

  @ApiProperty({
    description: 'Endereço completo (opcional)',
    example: 'Av. Paulista, 1000, São Paulo - SP',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'ID do paciente associado à localização',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'ID do paciente é obrigatório' })
  patientId: string;
}
