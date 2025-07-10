import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop([
    {
      menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
      quantity: Number,
    },
  ])
  items: { menu: string; quantity: number }[];

  @Prop({ default: 'pending' })
  status: 'pending' | 'in_progress' | 'completed';

  @Prop()
  totalPrice: number;
}
