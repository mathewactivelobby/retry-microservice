import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { MicroserviceClientService } from './microservice-client-service/microservice-client-service.service';
import { QueueProcessor } from './queue-processor/queue-processor.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'event-queue',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MicroserviceClientService, QueueProcessor],
})
export class AppModule {}
