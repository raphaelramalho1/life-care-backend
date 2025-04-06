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
import { CaregiverService } from './caregiver.service';

import { Caregiver } from '../caregiver.entity';
import { CreateCaregiverDto } from '../dto/create-caregiver.dto';
import { UpdateCaregiverDto } from '../dto/update-caregiver.dto';

@ApiTags('caregivers')
@Controller('caregivers')
@ApiBearerAuth('JWT-auth')
export class CaregiverController {
  constructor(private readonly caregiverService: CaregiverService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo cuidador' })
  @ApiResponse({
    status: 201,
    description: 'Cuidador criado com sucesso.',
    type: Caregiver,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createCaregiverDto: CreateCaregiverDto): Promise<Caregiver> {
    return this.caregiverService.create(createCaregiverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cuidadores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cuidadores retornada com sucesso.',
    type: [Caregiver],
  })
  findAll(): Promise<Caregiver[]> {
    return this.caregiverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um cuidador pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Cuidador encontrado com sucesso.',
    type: Caregiver,
  })
  @ApiResponse({ status: 404, description: 'Cuidador não encontrado.' })
  findOne(@Param('id') id: string): Promise<Caregiver> {
    return this.caregiverService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um cuidador' })
  @ApiResponse({
    status: 200,
    description: 'Cuidador atualizado com sucesso.',
    type: Caregiver,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Cuidador não encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateCaregiverDto: UpdateCaregiverDto,
  ): Promise<Caregiver> {
    return this.caregiverService.update(id, updateCaregiverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cuidador' })
  @ApiResponse({ status: 200, description: 'Cuidador removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cuidador não encontrado.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.caregiverService.remove(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Buscar um cuidador pelo ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Cuidador encontrado com sucesso.',
    type: Caregiver,
  })
  @ApiResponse({ status: 404, description: 'Cuidador não encontrado.' })
  findByUserId(@Param('userId') userId: string): Promise<Caregiver> {
    return this.caregiverService.findByUserId(userId);
  }
}
