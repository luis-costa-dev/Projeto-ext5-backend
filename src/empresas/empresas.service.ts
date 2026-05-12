import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './empresa.entity';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async findAll() {
    return this.empresaRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string) {
    return this.empresaRepository.findOneBy({ id });
  }

  async create(dto: CreateEmpresaDto) {
    const id = dto.id || Date.now().toString();
    const entity = this.empresaRepository.create({ ...dto, id });
    return this.empresaRepository.save(entity);
  }

  async update(id: string, dto: UpdateEmpresaDto) {
    const exists = await this.empresaRepository.findOneBy({ id });
    if (!exists) throw new NotFoundException('Empresa não encontrada');
    const merged = this.empresaRepository.merge(exists, dto);
    return this.empresaRepository.save(merged);
  }

  async remove(id: string) {
    const res = await this.empresaRepository.delete(id);
    if (res.affected === 0) throw new NotFoundException('Empresa não encontrada');
    return id;
  }
}
