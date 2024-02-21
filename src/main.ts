import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const availablePorts = [3000, 4000, 3500];
  let selectedPort: number | undefined;

  for (const port of availablePorts) {
    try {
      const app = await NestFactory.create(AppModule, { logger: false });
      await app.listen(port);
      selectedPort = port;
      break;
    } catch (err) {
      // El puerto ya está en uso, intenta con el siguiente puerto
      console.log(`El puerto ${port} ya está en uso`);
    }
  }

  if (!selectedPort) {
    throw new Error('No hay puertos disponibles');
  }

  console.log(`Aplicación escuchando en el puerto ${selectedPort}`);
}

bootstrap();
