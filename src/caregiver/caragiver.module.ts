import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Caregiver } from './caregiver.entity';
import { CaregiverController } from './caregiver/caregiver.controller';
import { CaregiverService } from './caregiver/caregiver.service';

@Module({
  imports: [TypeOrmModule.forFeature([Caregiver])],
  controllers: [CaregiverController],
  providers: [CaregiverService],
  exports: [CaregiverService],
})
export class CaregiverModule {}
