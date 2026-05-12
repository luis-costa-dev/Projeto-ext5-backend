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
import { ForwardingService } from './forwarding.service';
import { CreateForwardingDto } from './dto/create-forwarding.dto';
import { UpdateForwardingDto } from './dto/update-forwarding.dto';

@Controller('api/forwarding')
export class ForwardingController {
  constructor(private readonly forwardingService: ForwardingService) {}

  @Get()
  async findAll() {
    return this.forwardingService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.forwardingService.findById(id);
  }

  @Get('aluno/:aluno')
  async findByAluno(@Param('aluno') aluno: string) {
    return this.forwardingService.findByAluno(aluno);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createForwardingDto: CreateForwardingDto) {
    return this.forwardingService.create(createForwardingDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateForwardingDto: UpdateForwardingDto,
  ) {
    return this.forwardingService.update(id, updateForwardingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.forwardingService.remove(id);
  }
}
