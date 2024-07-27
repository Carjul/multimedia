import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';


async function main() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  await app.listen(8000);
}
main();
