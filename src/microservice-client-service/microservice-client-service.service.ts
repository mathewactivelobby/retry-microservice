import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class MicroserviceClientService implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    // Initialize with default configuration if needed
    this.setClient('localhost', 3001);
  }

  setClient(host: string, port: number) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    });
  }

  getClient(): ClientProxy {
    return this.client;
  }
}
