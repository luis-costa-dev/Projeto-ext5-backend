import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('general')
  async getGeneralReport() {
    return this.reportsService.getGeneralReport();
  }

  @Get('evaluations')
  async getEvaluationStats() {
    return this.reportsService.getEvaluationStats();
  }

  @Get('forwarding')
  async getForwardingReport() {
    return this.reportsService.getForwardingReport();
  }

  @Get('student/:name')
  async getStudentReport(@Param('name') name: string) {
    return this.reportsService.getStudentReport(name);
  }
}
