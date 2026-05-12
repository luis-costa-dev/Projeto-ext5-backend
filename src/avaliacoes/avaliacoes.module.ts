import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from './avaliacao.entity';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesController } from './avaliacoes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Avaliacao])],
  providers: [AvaliacoesService],
  controllers: [AvaliacoesController],
  exports: [AvaliacoesService],
})
export class AvaliacoesModule {}
