import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MicroserviceClientService } from 'src/microservice-client-service/microservice-client-service.service';

@Processor('event-queue')
export class QueueProcessor {
  constructor(private readonly microserviceClientService: MicroserviceClientService) {}

  @Process()
  async handleEvent(job: Job) {
    const { host, port, event, payload } = job.data;

    // Set up the microservice client dynamically
    this.microserviceClientService.setClient(host, port);
    const client = this.microserviceClientService.getClient();

    // Emit the event to the microservice
    client.emit(event, payload);
  }
}
