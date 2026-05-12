import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasController } from './pessoas.controller';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa])],
  controllers: [PessoasController],
  providers: [PessoasService],
})
export class PessoasModule {}
