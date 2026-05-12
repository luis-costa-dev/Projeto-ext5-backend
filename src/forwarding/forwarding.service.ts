import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forwarding } from './forwarding.entity';
import { CreateForwardingDto } from './dto/create-forwarding.dto';
import { UpdateForwardingDto } from './dto/update-forwarding.dto';

@Injectable()
export class ForwardingService {
  constructor(
    @InjectRepository(Forwarding)
    private forwardingRepository: Repository<Forwarding>,
  ) {}

  async create(createForwardingDto: CreateForwardingDto): Promise<Forwarding> {
    const forwarding = this.forwardingRepository.create(createForwardingDto);
    return this.forwardingRepository.save(forwarding);
  }

  async findAll(): Promise<Forwarding[]> {
    return this.forwardingRepository.find();
  }

  async findById(id: string): Promise<Forwarding> {
    const forwarding = await this.forwardingRepository.findOne({ where: { id } });
    if (!forwarding) {
      throw new NotFoundException(`Encaminhamento com ID ${id} não encontrado`);
    }
    return forwarding;
  }

  async findByAluno(aluno: string): Promise<Forwarding[]> {
    return this.forwardingRepository.find({ where: { aluno } });
  }

  async update(id: string, updateForwardingDto: UpdateForwardingDto): Promise<Forwarding> {
    await this.findById(id);
    await this.forwardingRepository.update(id, updateForwardingDto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const forwarding = await this.findById(id);
    await this.forwardingRepository.remove(forwarding);
  }
}
