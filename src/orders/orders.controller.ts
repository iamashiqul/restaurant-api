import {
  Controller,
  UseGuards,
  Post,
  Get,
  Req,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';


@ApiTags('Orders')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin')
  @ApiOperation({ summary: 'Admin: Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders' })
  getAllOrdersForAdmin() {
    return this.service.findAllOrders(); // pastikan method ini ada di service
  }
    
  @Post()
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid order data' })
  create(@Req() req: Request, @Body() dto: CreateOrderDto) {
    return this.service.createOrder((req as any).user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get current user orders' })
  @ApiResponse({ status: 200, description: 'List of user orders' })
  getUserOrders(@Req() req: Request) {
    return this.service.findUserOrders((req as any).user.userId);
  }
}
