import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patient/patient.entity';
import { Caregiver } from '../../caregiver/caregiver.entity';

export enum UserRole {
  ADMIN = 'admin',
  PATIENT = 'patient',
  CAREGIVER = 'caregiver',
}

@Entity('users')
export class User {
  @ApiProperty({ description: 'ID único do usuário' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome completo do usuário' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (não retornada nas respostas)',
  })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ description: 'Função do usuário no sistema', enum: UserRole })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PATIENT,
  })
  role: UserRole;

  @ApiProperty({ description: 'Indica se o usuário está ativo' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Indica se o email do usuário foi verificado' })
  @Column({ default: false })
  isEmailVerified: boolean;

  @ApiProperty({ description: 'Token de verificação de email' })
  @Column({ nullable: true })
  @Exclude()
  verificationToken: string;

  @ApiProperty({ description: 'Data de expiração do token de verificação' })
  @Column({ nullable: true })
  @Exclude()
  verificationTokenExpires: Date;

  @ApiProperty({
    description: 'PIN para login simplificado (apenas para pacientes)',
  })
  @Column({ nullable: true })
  @Exclude()
  pin: string;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do registro' })
  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionamentos
  @ApiProperty({
    description: 'Paciente associado ao usuário',
    type: () => Patient,
  })
  @OneToOne(() => Patient, (patient) => patient.user, { lazy: true })
  patient: Patient;

  @ApiProperty({
    description: 'Cuidador associado ao usuário',
    type: () => Caregiver,
  })
  @OneToOne(() => Caregiver, (caregiver) => caregiver.user, { lazy: true })
  caregiver: Caregiver;
}
