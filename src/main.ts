import { NestFactory } from '@nestjs/core';
import { AppModule } from './controllers/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL, // Replace with your allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Set this to true if your app uses sessions/authentication
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  const PORT: string | number = process.env.PORT || 8000;
  await app.listen(PORT);
  console.log(`meals server running on port ${PORT}`);
}
bootstrap();
