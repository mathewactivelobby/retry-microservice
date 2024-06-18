import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('RETRY_MICROSERVICE') private retry: ClientProxy
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async callRetryMicroservice(data: any): Promise<any> {
    try {
      const pattern = 'dynamic-call'; // Define a pattern that your microservice expects
      console.log('entered 1')
      this.retry.emit(pattern, data);
      return 'Done';
    } catch (error) {
      console.error('Error calling retry-microservice:', error);
      throw error;
    }
  }
}
