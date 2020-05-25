import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import * as Express from 'express';
import { join } from 'path';

const server = Express();
server.get('/', (req, res) => res.send('ok'));
server.get('/-ah/health', (req, res) => res.send('ok'));

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));
  app.useStaticAssets(join(process.cwd(), '../static/'));
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
