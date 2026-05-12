import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly repo: Repository<Pessoa>,
  ) {}

  async create(data: CreatePessoaDto) {
    const entity = this.repo.create(data as any);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException('Pessoa não encontrada');
    return item;
  }

  async update(id: number, data: UpdatePessoaDto) {
    const toUpdate = await this.repo.preload({ id, ...(data as any) });
    if (!toUpdate) throw new NotFoundException('Pessoa não encontrada');
    return this.repo.save(toUpdate);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException('Pessoa não encontrada');
    return { deleted: true };
  }
}
