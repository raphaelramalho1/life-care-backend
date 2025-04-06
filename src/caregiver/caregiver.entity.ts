import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { Patient } from '../patient/patient.entity';

@Entity('caregivers')
export class Caregiver {
  @ApiProperty({ description: 'ID único do cuidador' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Especialização do cuidador' })
  @Column()
  specialization: string;

  @ApiProperty({ description: 'Anos de experiência do cuidador' })
  @Column()
  yearsOfExperience: number;

  @ApiProperty({ description: 'Biografia do cuidador' })
  @Column({ type: 'text', nullable: true })
  biography: string;

  @ApiProperty({ description: 'Certificações do cuidador' })
  @Column({ type: 'text', nullable: true })
  certifications: string;

  @ApiProperty({ description: 'Disponibilidade do cuidador' })
  @Column({ default: true })
  isAvailable: boolean;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do registro' })
  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionamentos
  @ApiProperty({
    description: 'Usuário associado ao cuidador',
    type: () => User,
  })
  @OneToOne(() => User, (user) => user.caregiver, { lazy: true })
  @JoinColumn()
  user: User;

  @ApiProperty({ description: 'ID do usuário associado' })
  @Column()
  userId: string;

  @ApiProperty({
    description: 'Pacientes atendidos pelo cuidador',
    type: () => [Patient],
  })
  @ManyToMany(() => Patient, { lazy: true })
  @JoinTable({
    name: 'caregiver_patients',
    joinColumn: { name: 'caregiver_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'patient_id', referencedColumnName: 'id' },
  })
  patients: Patient[];
}
