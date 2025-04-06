import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let error = 'Internal Server Error';

    // Tratamento de exceções HTTP
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      message =
        typeof errorResponse === 'object' && 'message' in errorResponse
          ? Array.isArray(errorResponse['message'])
            ? errorResponse['message'][0]
            : errorResponse['message']
          : exception.message;
      error = exception.name;
    }
    // Tratamento de erros do TypeORM
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Erro na operação do banco de dados';
      error = exception.name;

      // Tratamento específico para violação de chave única
      if (exception.message.includes('duplicate key')) {
        message = 'Registro duplicado encontrado';
      }
    }

    // Log do erro
    this.logger.error(
      `${request.method} ${request.url} - Status: ${status}, Message: ${message}`,
      exception instanceof Error ? exception.stack : '',
    );

    // Resposta formatada
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    });
  }
}
