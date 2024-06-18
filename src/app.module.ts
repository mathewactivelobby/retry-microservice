import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { MicroserviceClientService } from './microservice-client-service/microservice-client-service.service';
import { QueueProcessor } from './queue-processor/queue-processor.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: '0.0.0.0',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'event-queue',
    }),
    ClientsModule.register([
      {
        name: 'RETRY_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0', // Adjust the host and port as necessary
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, MicroserviceClientService, QueueProcessor],
})
export class AppModule {}
