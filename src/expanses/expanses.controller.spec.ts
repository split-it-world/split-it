import { Test, TestingModule } from '@nestjs/testing';
import { ExpansesController } from './expanses.controller';

describe('ExpansesController', () => {
  let controller: ExpansesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpansesController],
    }).compile();

    controller = module.get<ExpansesController>(ExpansesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
