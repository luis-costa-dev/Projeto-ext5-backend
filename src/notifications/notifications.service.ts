import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationsRepository.create(createNotificationDto);
    return this.notificationsRepository.save(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationsRepository.find({ order: { when: 'DESC' } });
  }

  async findById(id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException(`Notificação com ID ${id} não encontrada`);
    }
    return notification;
  }

  async findUnread(): Promise<Notification[]> {
    return this.notificationsRepository.find({ where: { read: false }, order: { when: 'DESC' } });
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    await this.findById(id);
    await this.notificationsRepository.update(id, updateNotificationDto);
    return this.findById(id);
  }

  async markAsRead(id: string): Promise<Notification> {
    await this.findById(id);
    await this.notificationsRepository.update(id, { read: true });
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const notification = await this.findById(id);
    await this.notificationsRepository.remove(notification);
  }
}
