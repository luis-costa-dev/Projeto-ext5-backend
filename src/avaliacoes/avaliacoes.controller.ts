import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { Avaliacao } from './avaliacao.entity';

@Controller('api/avaliacoes')
export class AvaliacoesController {
  constructor(private readonly avaliacoesService: AvaliacoesService) {}

  @Get()
  async findAll(@Query('pessoa_id') pessoa_id?: string): Promise<Avaliacao[]> {
    if (pessoa_id) {
      return this.avaliacoesService.findByPessoaId(parseInt(pessoa_id, 10));
    }
    return this.avaliacoesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Avaliacao> {
    return this.avaliacoesService.findById(id);
  }

  @Post()
  async create(@Body() createAvaliacaoDto: CreateAvaliacaoDto): Promise<Avaliacao> {
    return this.avaliacoesService.create(createAvaliacaoDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvaliacaoDto: Partial<CreateAvaliacaoDto>,
  ): Promise<Avaliacao> {
    return this.avaliacoesService.update(id, updateAvaliacaoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.avaliacoesService.remove(id);
  }
}
