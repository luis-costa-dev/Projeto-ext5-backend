import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from '../avaliacoes/avaliacao.entity';
import { Forwarding } from '../forwarding/forwarding.entity';
import { InternalControl } from '../internal-control/internal-control.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacoesRepository: Repository<Avaliacao>,
    @InjectRepository(Forwarding)
    private forwardingRepository: Repository<Forwarding>,
    @InjectRepository(InternalControl)
    private internalControlRepository: Repository<InternalControl>,
  ) {}

  async getStudentReport(studentName: string) {
    const evaluations = await this.avaliacoesRepository
      .createQueryBuilder('a')
      .where('a.pessoa_id IN (SELECT id FROM pessoas WHERE name ILIKE :name)', { name: `%${studentName}%` })
      .orderBy('a.data_avaliacao', 'DESC')
      .getMany();

    const forwarding = await this.forwardingRepository.find({
      where: { aluno: studentName },
    });

    const internalControl = await this.internalControlRepository.find({
      where: { aluno: studentName },
    });

    return {
      studentName,
      totalEvaluations: evaluations.length,
      evaluations,
      forwarding,
      internalControl,
    };
  }

  async getGeneralReport() {
    const totalEvaluations = await this.avaliacoesRepository.count();
    const totalForwarding = await this.forwardingRepository.count();
    const totalInternalControl = await this.internalControlRepository.count();

    const evaluationsByType = await this.avaliacoesRepository
      .createQueryBuilder('a')
      .select('a.tipo', 'tipo')
      .addSelect('COUNT(a.id)', 'count')
      .groupBy('a.tipo')
      .getRawMany();

    const activeForwarding = await this.forwardingRepository
      .createQueryBuilder('f')
      .where('f.dataDesligamento IS NULL')
      .getMany();

    return {
      summary: {
        totalEvaluations,
        totalForwarding,
        totalInternalControl,
        activeForwarding: activeForwarding.length,
      },
      evaluationsByType,
    };
  }

  async getEvaluationStats() {
    const stats = await this.avaliacoesRepository
      .createQueryBuilder('a')
      .select([
        'a.tipo as tipo',
        'COUNT(a.id) as total',
        'AVG(CASE WHEN a.q01 = \'sim\' THEN 1 ELSE 0 END) as avg_q01',
      ])
      .groupBy('a.tipo')
      .getRawMany();

    return stats;
  }

  async getForwardingReport() {
    return this.forwardingRepository
      .createQueryBuilder('f')
      .select([
        'f.empresa',
        'COUNT(f.id) as total',
        'COUNT(CASE WHEN f.dataDesligamento IS NULL THEN 1 END) as active',
      ])
      .groupBy('f.empresa')
      .getRawMany();
  }
}
