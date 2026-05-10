import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

@Controller('notifications')
export class NotificationController {

  constructor(private readonly notificationsService: NotificationService) {}

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Post()
  send(@Body() dto: SendNotificationDto) {
    return this.notificationsService.send(dto);
  }
}