import { CreateOrderDto } from './dto/create-order.dto';

export class OrdersService {
  constructor(
    private readonly menuModel: any,
    private readonly orderModel: any,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    let total = 0;
    for (const item of dto.items) {
      const menu = await this.menuModel.findById(item.menu);
      total += menu.price * item.quantity;
    }

    return this.orderModel.create({
      user: userId,
      items: dto.items,
      totalPrice: total,
    });
  }
}
