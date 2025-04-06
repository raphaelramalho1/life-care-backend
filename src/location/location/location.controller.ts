// src/location/location/location.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Location } from './location.entity';

@ApiTags('locations')
@Controller('locations')
@ApiBearerAuth('JWT-auth')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar uma nova localização' })
  @ApiResponse({
    status: 201,
    description: 'Localização registrada com sucesso.',
    type: Location,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationService.create(createLocationDto);
  }

  // Endpoint específico para o frontend
  @Post(':patientId')
  @ApiOperation({
    summary: 'Registrar uma nova localização para um paciente específico',
  })
  @ApiResponse({
    status: 201,
    description: 'Localização registrada com sucesso.',
    type: Location,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  createForPatient(
    @Param('patientId') patientId: string,
    @Body() locationData: any,
  ): Promise<Location> {
    const createLocationDto: CreateLocationDto = {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      address: locationData.address,
      patientId: patientId,
    };
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as localizações' })
  @ApiResponse({
    status: 200,
    description: 'Lista de localizações retornada com sucesso.',
    type: [Location],
  })
  findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma localização pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Localização encontrada com sucesso.',
    type: Location,
  })
  @ApiResponse({ status: 404, description: 'Localização não encontrada.' })
  findOne(@Param('id') id: string): Promise<Location> {
    return this.locationService.findOne(id);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Buscar localizações de um paciente' })
  @ApiResponse({
    status: 200,
    description: 'Localizações encontradas com sucesso.',
    type: [Location],
  })
  findByPatientId(@Param('patientId') patientId: string): Promise<Location[]> {
    return this.locationService.findByPatientId(patientId);
  }

  @Get('patient/:patientId/latest')
  @ApiOperation({ summary: 'Buscar a localização mais recente de um paciente' })
  @ApiResponse({
    status: 200,
    description: 'Localização encontrada com sucesso.',
    type: Location,
  })
  @ApiResponse({ status: 404, description: 'Localização não encontrada.' })
  getLatestByPatientId(
    @Param('patientId') patientId: string,
  ): Promise<Location> {
    return this.locationService.getLatestByPatientId(patientId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma localização' })
  @ApiResponse({
    status: 200,
    description: 'Localização atualizada com sucesso.',
    type: Location,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Localização não encontrada.' })
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma localização' })
  @ApiResponse({
    status: 200,
    description: 'Localização removida com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Localização não encontrada.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.locationService.remove(id);
  }
}
