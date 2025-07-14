import { Controller, UseGuards, Post, Get, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  create(@Req() req: Request, @Body() dto: CreateOrderDto) {
    return this.service.createOrder((req as any).user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  getUserOrders(@Req() req: Request) {
    return this.service.findUserOrders((req as any).user.userId);
  }
}
