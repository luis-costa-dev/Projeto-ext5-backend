import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';
import { UsersModule } from './users/users.module';
import { ForwardingModule } from './forwarding/forwarding.module';
import { InternalControlModule } from './internal-control/internal-control.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReportsModule } from './reports/reports.module';
import { EmpresasModule } from './empresas/empresas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'instituto',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PessoasModule,
    AvaliacoesModule,
    UsersModule,
    ForwardingModule,
    InternalControlModule,
    NotificationsModule,
    ReportsModule,
    EmpresasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
