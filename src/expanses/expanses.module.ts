import { Module } from '@nestjs/common';
import { ExpansesService } from './expanses.service';
import { ExpansesController } from './expanses.controller';

@Module({
  providers: [ExpansesService],
  controllers: [ExpansesController]
})
export class ExpansesModule {}
