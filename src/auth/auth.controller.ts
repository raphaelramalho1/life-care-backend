import {
  Controller,
  Post,
  Request,
  Body,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestVerificationDto } from './dto/request-verification.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { PinLoginDto } from './dto/pin-login.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Autenticar cuidador com email e senha' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() loginDto: LoginDto) {
    try {
      console.log('Tentativa de login:', loginDto.email);

      // Login de teste para desenvolvimento - usuários fixos
      const testUsers = [
        {
          email: 'teste@exemplo.com',
          password: 'senha123',
          name: 'Usuário Teste',
          role: 'patient',
        },
        {
          email: 'raphaelramalho41@gmail.com',
          password: 'senha123',
          name: 'Raphael Ramalho',
          role: 'patient',
        },
        {
          email: 'raphaelramalho41@outlook.com',
          password: 'senha123',
          name: 'Raphael Ramalho',
          role: 'patient',
        },
        {
          email: 'davi.ferreiras@sempreceub.com',
          password: 'senha123',
          name: 'Davi Ferreira',
          role: 'caregiver',
        },
        {
          email: 'lucaspcls2011@gmail.com',
          password: 'senha123',
          name: 'Lucas',
          role: 'caregiver',
        },
      ];

      // Verificar se o email e senha correspondem a algum usuário de teste
      const testUser = testUsers.find(
        (user) =>
          user.email === loginDto.email && user.password === loginDto.password,
      );

      if (testUser) {
        console.log('Login de teste bem-sucedido para:', testUser.email);
        return {
          user: {
            id: '12345',
            name: testUser.name,
            email: testUser.email,
            role: testUser.role,
          },
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGV4ZW1wbG8uY29tIiwic3ViIjoiMTIzNDUiLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTcxNjQyMjM0NiwiZXhwIjoxNzE2NTA4NzQ2fQ.qwertyuiopasdfghjklzxcvbnm',
        };
      }

      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      
      if (!user) {
        console.log('Credenciais inválidas para:', loginDto.email);
        return { statusCode: 401, message: 'Credenciais inválidas' };
      }
      
      // Verificar se o email foi confirmado
      if (user.emailVerified === false) {
        console.log('Email não verificado para:', loginDto.email);
        return { 
          statusCode: 403, 
          message: 'Email não verificado',
          needsVerification: true,
          email: loginDto.email
        };
      }

      console.log('Login bem-sucedido para:', loginDto.email);
      return this.authService.login(user);
    } catch (error) {
      console.error('Erro no login:', error);
      return { statusCode: 401, message: 'Credenciais inválidas' };
    }
  }

  @Public()
  @Post('login-pin')
  @ApiOperation({ summary: 'Autenticar paciente com PIN' })
  @ApiResponse({
    status: 200,
    description: 'Paciente autenticado com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'PIN inválido.' })
  async loginWithPin(@Body() pinLoginDto: PinLoginDto) {
    try {
      console.log('Tentativa de login com PIN');

      // Login de teste para desenvolvimento - PIN fixo
      if (pinLoginDto.pin === '123456') {
        console.log('Login de teste com PIN bem-sucedido');
        return {
          user: {
            id: '54321',
            name: 'Paciente Teste',
            role: 'patient',
          },
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NDMyMSIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzE2NDIyMzQ2LCJleHAiOjE3MTY1MDg3NDZ9.qwertyuiopasdfghjklzxcvbnm',
        };
      }

      return this.authService.loginWithPin(pinLoginDto.pin);
    } catch (error) {
      console.error('Erro no login com PIN:', error);
      return { statusCode: 401, message: 'PIN inválido' };
    }
  }

  @Public()
  @Post('request-verification')
  @ApiOperation({ summary: 'Solicitar verificação de email' })
  @ApiResponse({ status: 200, description: 'Token de verificação enviado.' })
  async requestVerification(@Body() requestDto: RequestVerificationDto) {
    return this.authService.sendVerificationToken(requestDto.email);
  }

  @Public()
  @Post('verify-email')
  @ApiOperation({ summary: 'Verificar email com token' })
  @ApiResponse({ status: 200, description: 'Email verificado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Token inválido ou expirado.' })
  async verifyEmail(@Body() verifyDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyDto.email, verifyDto.token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register-patient')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Registrar um novo paciente (apenas cuidadores)' })
  @ApiResponse({ status: 201, description: 'Paciente registrado com sucesso.' })
  @ApiResponse({
    status: 403,
    description: 'Apenas cuidadores podem registrar pacientes.',
  })
  async registerPatient(
    @Request() req,
    @Body() registerPatientDto: RegisterPatientDto,
  ) {
    return this.authService.registerPatient(req.user.id, registerPatientDto);
  }

  @Get('refresh/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Renovar token de acesso' })
  @ApiResponse({ status: 200, description: 'Token renovado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Usuário inválido.' })
  async refreshToken(@Param('id') id: string) {
    return this.authService.refreshToken(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Obter perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil obtido com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async getProfile(@Request() req) {
    // req.user é adicionado pelo JwtAuthGuard
    return req.user;
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo cuidador' })
  @ApiResponse({ status: 201, description: 'Cuidador registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      console.log('Tentativa de registro:', createUserDto.email);
      
      // Definir o papel como cuidador diretamente no objeto
      createUserDto.role = UserRole.CAREGIVER;
      
      // Criar o usuário
      const user = await this.usersService.create(createUserDto);
      console.log('Usuário criado com sucesso:', user.email);
      
      // Enviar email de verificação
      const verificationResult = await this.authService.sendVerificationToken(user.email);
      console.log('Resultado do envio de verificação:', verificationResult);
      
      // Remover a senha da resposta
      const { password, ...result } = user;
      
      return {
        success: true,
        message: 'Cuidador registrado com sucesso. Verifique seu email para ativar sua conta.',
        user: result,
        verification: {
          success: verificationResult.success,
          message: verificationResult.message,
          previewUrl: verificationResult.previewUrl
        }
      };
    } catch (error) {
      console.error('Erro ao registrar cuidador:', error);
      if (error.code === '23505') { // Código de erro do PostgreSQL para chave duplicada
        return { success: false, message: 'Email já está em uso' };
      }
      return { success: false, message: 'Erro ao registrar cuidador: ' + error.message };
    }
  }
}
