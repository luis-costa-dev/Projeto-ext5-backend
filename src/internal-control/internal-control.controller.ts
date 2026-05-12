import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InternalControlService } from './internal-control.service';
import { CreateInternalControlDto } from './dto/create-internal-control.dto';
import { UpdateInternalControlDto } from './dto/update-internal-control.dto';

@Controller('api/internal-control')
export class InternalControlController {
  constructor(private readonly internalControlService: InternalControlService) {}

  @Get()
  async findAll() {
    return this.internalControlService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.internalControlService.findById(id);
  }

  @Get('aluno/:aluno')
  async findByAluno(@Param('aluno') aluno: string) {
    return this.internalControlService.findByAluno(aluno);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createInternalControlDto: CreateInternalControlDto) {
    return this.internalControlService.create(createInternalControlDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInternalControlDto: UpdateInternalControlDto,
  ) {
    return this.internalControlService.update(id, updateInternalControlDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.internalControlService.remove(id);
  }
}
