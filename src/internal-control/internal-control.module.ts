import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalControl } from './internal-control.entity';
import { InternalControlService } from './internal-control.service';
import { InternalControlController } from './internal-control.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InternalControl])],
  controllers: [InternalControlController],
  providers: [InternalControlService],
  exports: [InternalControlService],
})
export class InternalControlModule {}
