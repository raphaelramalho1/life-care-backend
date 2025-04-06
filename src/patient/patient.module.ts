import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
