import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

type OrderItem = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

type OrderCardProps = {
  orderId: number;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
};

const OrderCard: FC<OrderCardProps> = ({ orderId, date, status, items, total }) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between mb-4">
          <div>
            <h4 className="font-semibold text-lg">Order #{orderId}</h4>
            <p className="text-sm text-muted-foreground">{new Date(date).toLocaleString()}</p>
          </div>
          <div className="font-semibold text-primary">{status}</div>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={item.imageUrl || "/placeholder.jpg"}
                  alt={item.productName}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} × ₹{item.price}
                  </p>
                </div>
              </div>
              <div className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
