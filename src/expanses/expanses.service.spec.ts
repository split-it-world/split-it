import { Test, TestingModule } from '@nestjs/testing';
import { ExpansesService } from './expanses.service';

describe('ExpansesService', () => {
  let service: ExpansesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpansesService],
    }).compile();

    service = module.get<ExpansesService>(ExpansesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
