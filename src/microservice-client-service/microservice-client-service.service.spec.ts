import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceClientServiceService } from './microservice-client-service.service';

describe('MicroserviceClientServiceService', () => {
  let service: MicroserviceClientServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroserviceClientServiceService],
    }).compile();

    service = module.get<MicroserviceClientServiceService>(MicroserviceClientServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
