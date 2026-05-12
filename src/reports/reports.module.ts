import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from '../avaliacoes/avaliacao.entity';
import { Forwarding } from '../forwarding/forwarding.entity';
import { InternalControl } from '../internal-control/internal-control.entity';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Avaliacao, Forwarding, InternalControl])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
