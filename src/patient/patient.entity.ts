import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { Location } from '../location/location/location.entity';

@Entity('patients')
export class Patient {
  @ApiProperty({ description: 'ID único do paciente' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Idade do paciente' })
  @Column()
  age: number;

  @ApiProperty({ description: 'Condição médica do paciente' })
  @Column({ nullable: true })
  medicalCondition: string;

  @ApiProperty({ description: 'Contato de emergência do paciente' })
  @Column()
  emergencyContact: string;

  @ApiProperty({ description: 'Telefone do contato de emergência' })
  @Column()
  emergencyPhone: string;

  @ApiProperty({ description: 'Endereço do paciente' })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({ description: 'Observações sobre o paciente' })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do registro' })
  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionamentos
  @ApiProperty({
    description: 'Usuário associado ao paciente',
    type: () => User,
  })
  @OneToOne(() => User, (user) => user.patient, { lazy: true })
  @JoinColumn()
  user: User;

  @ApiProperty({ description: 'ID do usuário associado' })
  @Column()
  userId: string;

  @ApiProperty({
    description: 'Localizações registradas do paciente',
    type: () => [Location],
  })
  @OneToMany(() => Location, (location) => location.patient)
  locations: Location[];
}
