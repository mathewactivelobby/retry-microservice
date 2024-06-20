import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

export interface EventQueueData {
  host: string;
  port: number;
  event: string;
  payload: any;
  delay?: number
}

@Controller('api')
export class AppController {
  constructor(@InjectQueue('event-queue') private readonly eventQueue: Queue, private appservice: AppService) { }

  @Post('retry')
  async retry(@Body() data: any) {
    console.log('entered', data);
    const response = await this.appservice.callRetryMicroservice(data);
    return response;
  }

  @EventPattern('dynamic-call')
  async dynamicCall(data: EventQueueData) {
    try {
      console.log('entered 3')
      const { host, port, event, payload, delay } = data;

      // Add a job to the queue
      const job = await this.eventQueue.add({
        host,
        port,
        event,
        payload,
      },
        delay ? { delay } : undefined);
    } catch (err) {
      console.log('error', err);
    }
  }

  @EventPattern('event-call')
  async eventCall(data: any) {
    console.log(data, 'event call');
  }
}
