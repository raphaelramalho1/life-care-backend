import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { User, UserRole } from '../users/entities/user.entity';
import { RegisterPatientDto } from './dto/register-patient.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Armazenamento temporário de tokens (em produção, use Redis ou outro armazenamento)
  private verificationTokens: Map<string, { token: string; expires: Date }> =
    new Map();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Verificar se o email foi confirmado
        if (!user.isEmailVerified) {
          return { emailVerified: false };
        }
        
        const { password, ...result } = user;
        return result;
      }

      return null;
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return null;
    }
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(userId: string) {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário inválido');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Método para gerar e enviar token de verificação por email
  async sendVerificationToken(
    email: string,
  ): Promise<{ success: boolean; message: string; previewUrl?: string }> {
    try {
      const user = await this.usersService.findByEmail(email);

      // Gerar token de 6 dígitos
      const token = Math.floor(100000 + Math.random() * 900000).toString();

      // Definir expiração (15 minutos)
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 15);

      // Armazenar token no banco de dados
      await this.usersService.update(user.id, {
        verificationToken: token,
        verificationTokenExpires: expires,
      });

      // Enviar email
      const result = await this.emailService.sendVerificationEmail(
        email,
        token,
      );

      if (result.success) {
        return {
          success: true,
          message: 'Token de verificação enviado para o email',
          previewUrl: result.previewUrl,
        };
      } else {
        return {
          success: false,
          message: 'Falha ao enviar email de verificação',
        };
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Não informamos ao cliente que o email não existe por questões de segurança
        return {
          success: true,
          message: 'Se o email existir, um token de verificação será enviado',
        };
      }

      console.error('Erro ao enviar token de verificação:', error);
      return { success: false, message: 'Erro ao processar a solicitação' };
    }
  }

  // Verificar token recebido por email
  async verifyEmail(
    email: string,
    token: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Buscar usuário
      const user = await this.usersService.findByEmail(email);

      // Verificar se o token existe
      if (!user.verificationToken) {
        return { success: false, message: 'Token não encontrado ou expirado' };
      }

      // Verificar se o token expirou
      if (new Date() > user.verificationTokenExpires) {
        return { success: false, message: 'Token expirado' };
      }

      // Verificar se o token está correto
      if (user.verificationToken !== token) {
        return { success: false, message: 'Token inválido' };
      }

      // Atualizar status de verificação e limpar o token
      await this.usersService.update(user.id, { 
        isEmailVerified: true,
        verificationToken: '',
        verificationTokenExpires: new Date()
      });

      return { success: true, message: 'Email verificado com sucesso' };
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return { success: false, message: 'Erro ao verificar email' };
    }
  }

  // Login com PIN para pacientes
  async loginWithPin(pin: string): Promise<any> {
    try {
      // Buscar todos os usuários (em produção, use uma consulta otimizada)
      const users = await this.usersService.findAll();

      // Encontrar o usuário com o PIN correspondente
      const user = users.find((u) => u.pin === pin);

      if (!user || user.role !== UserRole.PATIENT) {
        throw new UnauthorizedException('PIN inválido');
      }

      return this.login(user);
    } catch (error) {
      throw new UnauthorizedException('PIN inválido');
    }
  }

  // Registrar um novo paciente (feito pelo cuidador)
  async registerPatient(
    caregiverId: string,
    registerPatientDto: RegisterPatientDto,
  ): Promise<{
    success: boolean;
    message: string;
    pin?: string;
    previewUrl?: string;
  }> {
    try {
      // Verificar se o cuidador existe
      const caregiver = await this.usersService.findOne(caregiverId);

      if (caregiver.role !== UserRole.CAREGIVER) {
        throw new BadRequestException(
          'Apenas cuidadores podem registrar pacientes',
        );
      }

      // Gerar PIN de 6 dígitos
      const pin = Math.floor(100000 + Math.random() * 900000).toString();

      // Criar senha aleatória para o paciente (não será usada, mas é necessária)
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      // Criar o usuário paciente
      const newPatient = await this.usersService.create({
        name: registerPatientDto.name,
        email:
          registerPatientDto.email || `patient_${Date.now()}@maioridade.app`, // Email fictício se não fornecido
        password: hashedPassword,
        role: UserRole.PATIENT,
        pin: pin,
        isEmailVerified: true, // Pacientes não precisam verificar email
      });

      // TODO: Criar a entidade paciente e associar ao usuário

      // Enviar email com o PIN para o cuidador
      const emailResult = await this.emailService.sendPatientPinEmail(
        caregiver.email,
        registerPatientDto.name,
        pin,
      );

      return {
        success: true,
        message: 'Paciente registrado com sucesso',
        pin: pin,
        previewUrl: emailResult.previewUrl,
      };
    } catch (error) {
      console.error('Erro ao registrar paciente:', error);
      return { success: false, message: 'Erro ao registrar paciente' };
    }
  }
}
