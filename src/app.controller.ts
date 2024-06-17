import { Controller, Get, Query } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('api')
export class AppController {
  constructor(@InjectQueue('event-queue') private readonly eventQueue: Queue) {}

  @Get('dynamic-call')
  async dynamicCall(@Query('host') host: string, @Query('port') port: number) {
    const event = 'your_event';
    const payload = { your: 'payload' };

    // Add a job to the queue
    await this.eventQueue.add({
      host,
      port,
      event,
      payload,
    });
  }
}
