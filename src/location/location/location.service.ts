// src/location/location/location.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const newLocation = this.locationRepository.create(createLocationDto);
    return this.locationRepository.save(newLocation);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find({
      relations: ['patient'],
    });
  }

  async findOne(id: string): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['patient'],
    });

    if (!location) {
      throw new NotFoundException(`Localização com ID ${id} não encontrada`);
    }

    return location;
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const location = await this.findOne(id);

    const updatedLocation = this.locationRepository.merge(
      location,
      updateLocationDto,
    );
    return this.locationRepository.save(updatedLocation);
  }

  async remove(id: string): Promise<void> {
    const location = await this.findOne(id);
    await this.locationRepository.remove(location);
  }

  async findByPatientId(patientId: string): Promise<Location[]> {
    return this.locationRepository.find({
      where: { patientId },
      relations: ['patient'],
      order: { timestamp: 'DESC' },
    });
  }

  async getLatestByPatientId(patientId: string): Promise<Location> {
    const locations = await this.locationRepository.find({
      where: { patientId },
      relations: ['patient'],
      order: { timestamp: 'DESC' },
      take: 1,
    });

    if (!locations.length) {
      throw new NotFoundException(
        `Nenhuma localização encontrada para o paciente com ID ${patientId}`,
      );
    }

    return locations[0];
  }
}
