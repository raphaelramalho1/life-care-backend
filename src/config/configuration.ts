// src/config/configuration.ts
// Configuração das variáveis de ambiente

export default () => {
  return {
    port: parseInt(process.env.PORT ?? '3000', 10),
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(String(process.env.DB_PORT) || '5432', 10),
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'senha',
    DB_DATABASE: process.env.DB_DATABASE || 'pi4',
    DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE === 'true',
    JWT_SECRET: process.env.JWT_SECRET || 'seu_segredo_jwt_muito_seguro',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1d',
    
    // Configurações de Email
    NODE_ENV: process.env.NODE_ENV || 'development',
    MAIL_HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
    MAIL_PORT: parseInt(process.env.MAIL_PORT || '465', 10),
    MAIL_SECURE: process.env.MAIL_SECURE === 'true',
    MAIL_USER: process.env.MAIL_USER || '',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
    MAIL_FROM: process.env.MAIL_FROM || 'noreply@maioridade.com',
  };
};
