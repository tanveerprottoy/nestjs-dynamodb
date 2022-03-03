import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initAppTable } from './data/models/app.model';

async function initDynamoDb() {
    initAppTable();
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    initDynamoDb();
    await app.listen(3000);
}

bootstrap();
