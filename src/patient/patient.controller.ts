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
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './patient.entity';

@ApiTags('patients')
@Controller('patients')
@ApiBearerAuth('JWT-auth')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo paciente' })
  @ApiResponse({
    status: 201,
    description: 'Paciente criado com sucesso.',
    type: Patient,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pacientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pacientes retornada com sucesso.',
    type: [Patient],
  })
  findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um paciente pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Paciente encontrado com sucesso.',
    type: Patient,
  })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado.' })
  findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um paciente' })
  @ApiResponse({
    status: 200,
    description: 'Paciente atualizado com sucesso.',
    type: Patient,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um paciente' })
  @ApiResponse({ status: 200, description: 'Paciente removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.patientService.remove(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Buscar um paciente pelo ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Paciente encontrado com sucesso.',
    type: Patient,
  })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado.' })
  findByUserId(@Param('userId') userId: string): Promise<Patient> {
    return this.patientService.findByUserId(userId);
  }
}
