import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly isDevelopment: boolean;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.isDevelopment = this.configService.get('NODE_ENV') !== 'production';
  }

  async sendVerificationEmail(
    email: string,
    token: string,
  ): Promise<{ success: boolean; message: string; previewUrl?: string }> {
    try {
      this.logger.log(`Enviando email de verificação para ${email}`);
      
      const result = await this.mailerService.sendMail({
        to: email,
        subject: 'Verificação de Email - Maioridade App',
        template: 'verification',
        context: {
          token,
        },
      });

      this.logger.log(`Email de verificação enviado para ${email} - ID: ${result.messageId}`);
      
      // Em desenvolvimento, podemos fornecer um link de preview - para Gmail, isso não é possível
      // Mas mantemos a lógica para compatibilidade com o teste anteriormente feito
      return {
        success: true,
        message: 'Email de verificação enviado com sucesso',
        previewUrl: this.isDevelopment ? `https://mailtrap.io` : undefined,
      };
    } catch (error) {
      this.logger.error(`Erro ao enviar email de verificação para ${email}`, error.stack);
      return {
        success: false,
        message: `Erro ao enviar email: ${error.message}`,
      };
    }
  }

  async sendPatientPinEmail(
    caregiverEmail: string,
    patientName: string,
    pin: string,
  ): Promise<{ success: boolean; message: string; previewUrl?: string }> {
    try {
      this.logger.log(`Enviando PIN do paciente ${patientName} para o cuidador ${caregiverEmail}`);
      
      const result = await this.mailerService.sendMail({
        to: caregiverEmail,
        subject: `PIN de Acesso para ${patientName} - Maioridade App`,
        template: 'patient-pin',
        context: {
          patientName,
          pin,
        },
      });

      this.logger.log(`Email com PIN enviado para ${caregiverEmail} - ID: ${result.messageId}`);
      
      return {
        success: true,
        message: 'Email com PIN enviado com sucesso',
        previewUrl: this.isDevelopment ? `https://mailtrap.io` : undefined,
      };
    } catch (error) {
      this.logger.error(`Erro ao enviar email com PIN para ${caregiverEmail}`, error.stack);
      return {
        success: false,
        message: `Erro ao enviar email: ${error.message}`,
      };
    }
  }

  // Método compatível com a implementação anterior para manter a funcionalidade existente
  async sendVerificationToken(
    email: string,
  ): Promise<{ success: boolean; message: string; previewUrl?: string }> {
    // Gerar token de verificação de 6 dígitos
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Enviar email com o token
    return this.sendVerificationEmail(email, token);
  }
}
