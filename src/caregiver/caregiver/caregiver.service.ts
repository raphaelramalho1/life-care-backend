import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caregiver } from '../caregiver.entity';
import { CreateCaregiverDto } from '../dto/create-caregiver.dto';
import { UpdateCaregiverDto } from '../dto/update-caregiver.dto';

@Injectable()
export class CaregiverService {
  constructor(
    @InjectRepository(Caregiver)
    private caregiverRepository: Repository<Caregiver>,
  ) {}

  async create(createCaregiverDto: CreateCaregiverDto): Promise<Caregiver> {
    const newCaregiver = this.caregiverRepository.create(createCaregiverDto);
    return this.caregiverRepository.save(newCaregiver);
  }

  async findAll(): Promise<Caregiver[]> {
    return this.caregiverRepository.find({
      relations: ['user', 'patients'],
    });
  }

  async findOne(id: string): Promise<Caregiver> {
    const caregiver = await this.caregiverRepository.findOne({
      where: { id },
      relations: ['user', 'patients'],
    });

    if (!caregiver) {
      throw new NotFoundException(`Cuidador com ID ${id} não encontrado`);
    }

    return caregiver;
  }

  async update(
    id: string,
    updateCaregiverDto: UpdateCaregiverDto,
  ): Promise<Caregiver> {
    const caregiver = await this.findOne(id);

    const updatedCaregiver = this.caregiverRepository.merge(
      caregiver,
      updateCaregiverDto,
    );
    return this.caregiverRepository.save(updatedCaregiver);
  }

  async remove(id: string): Promise<void> {
    const caregiver = await this.findOne(id);
    await this.caregiverRepository.remove(caregiver);
  }

  async findByUserId(userId: string): Promise<Caregiver> {
    const caregiver = await this.caregiverRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'patients'],
    });

    if (!caregiver) {
      throw new NotFoundException(
        `Cuidador com usuário ID ${userId} não encontrado`,
      );
    }

    return caregiver;
  }
}
