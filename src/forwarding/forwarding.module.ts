import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forwarding } from './forwarding.entity';
import { ForwardingService } from './forwarding.service';
import { ForwardingController } from './forwarding.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Forwarding])],
  controllers: [ForwardingController],
  providers: [ForwardingService],
  exports: [ForwardingService],
})
export class ForwardingModule {}
