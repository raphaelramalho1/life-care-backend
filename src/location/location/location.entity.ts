// src/location/location/location.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patient/patient.entity';

@Entity('locations')
export class Location {
  @ApiProperty({ description: 'ID único da localização' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Latitude da localização' })
  @Column('float')
  latitude: number;

  @ApiProperty({ description: 'Longitude da localização' })
  @Column('float')
  longitude: number;

  @ApiProperty({ description: 'Endereço completo', required: false })
  @Column({ nullable: true })
  address?: string;

  @ApiProperty({ description: 'Data e hora do registro' })
  @CreateDateColumn()
  timestamp: Date;

  @ApiProperty({
    description: 'Paciente associado à localização',
    type: () => Patient,
  })
  @ManyToOne(() => Patient, (patient) => patient.locations, { lazy: true })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  patientId: string;
}
