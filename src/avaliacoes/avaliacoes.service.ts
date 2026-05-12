import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from './avaliacao.entity';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';

@Injectable()
export class AvaliacoesService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async findAll(): Promise<Avaliacao[]> {
    return this.avaliacaoRepository.find({
      relations: ['pessoa'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByPessoaId(pessoa_id: number): Promise<Avaliacao[]> {
    return this.avaliacaoRepository.find({
      where: { pessoa_id },
      relations: ['pessoa'],
      order: {
        data_avaliacao: 'DESC',
      },
    });
  }

  async findById(id: number): Promise<Avaliacao> {
    const avaliacao = await this.avaliacaoRepository.findOne({
      where: { id },
      relations: ['pessoa'],
    });

    if (!avaliacao) {
      throw new NotFoundException(`Avaliação com ID ${id} não encontrada`);
    }

    return avaliacao;
  }

  async create(createAvaliacaoDto: CreateAvaliacaoDto): Promise<Avaliacao> {
    const avaliacao = this.avaliacaoRepository.create(createAvaliacaoDto);
    return this.avaliacaoRepository.save(avaliacao);
  }

  async update(id: number, updateAvaliacaoDto: Partial<CreateAvaliacaoDto>): Promise<Avaliacao> {
    const avaliacao = await this.findById(id);
    Object.assign(avaliacao, updateAvaliacaoDto);
    return this.avaliacaoRepository.save(avaliacao);
  }

  async remove(id: number): Promise<void> {
    const avaliacao = await this.findById(id);
    await this.avaliacaoRepository.remove(avaliacao);
  }
}
