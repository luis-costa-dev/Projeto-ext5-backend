import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalControl } from './internal-control.entity';
import { CreateInternalControlDto } from './dto/create-internal-control.dto';
import { UpdateInternalControlDto } from './dto/update-internal-control.dto';

@Injectable()
export class InternalControlService {
  constructor(
    @InjectRepository(InternalControl)
    private internalControlRepository: Repository<InternalControl>,
  ) {}

  async create(createInternalControlDto: CreateInternalControlDto): Promise<InternalControl> {
    const internalControl = this.internalControlRepository.create(createInternalControlDto);
    return this.internalControlRepository.save(internalControl);
  }

  async findAll(): Promise<InternalControl[]> {
    return this.internalControlRepository.find();
  }

  async findById(id: string): Promise<InternalControl> {
    const internalControl = await this.internalControlRepository.findOne({ where: { id } });
    if (!internalControl) {
      throw new NotFoundException(`Controle interno com ID ${id} não encontrado`);
    }
    return internalControl;
  }

  async findByAluno(aluno: string): Promise<InternalControl[]> {
    return this.internalControlRepository.find({ where: { aluno } });
  }

  async update(id: string, updateInternalControlDto: UpdateInternalControlDto): Promise<InternalControl> {
    await this.findById(id);
    await this.internalControlRepository.update(id, updateInternalControlDto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const internalControl = await this.findById(id);
    await this.internalControlRepository.remove(internalControl);
  }
}
