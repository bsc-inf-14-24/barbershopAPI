import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { SendNotificationDto } from '../notification/notification.controller';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  create(dto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(dto);
    return this.notificationRepository.save(notification);
  }

  findAll() {
    return this.notificationRepository.find();
  }

  send(dto: SendNotificationDto) {
    const notification = this.notificationRepository.create({
      message: dto.message,
      userId: dto.userId,
    });
    return this.notificationRepository.save(notification);
  }
}