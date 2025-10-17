import { FC } from "react";
import { Button } from "@/components/ui/button";

type CartItemProps = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
};

const CartItemCard: FC<CartItemProps> = ({
  productName,
  price,
  quantity,
  imageUrl,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between border rounded-2xl p-4 shadow-sm bg-white">
      <div className="flex items-center gap-4">
        <img
          src={imageUrl || "/placeholder.jpg"}
          alt={productName}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h4 className="font-semibold text-lg">{productName}</h4>
          <p className="text-sm text-gray-500">₹{price}</p>

          <div className="flex items-center mt-2 gap-2">
            <Button size="sm" variant="outline" onClick={onDecrease}>
              −
            </Button>
            <span className="text-base">{quantity}</span>
            <Button size="sm" variant="outline" onClick={onIncrease}>
              +
            </Button>
          </div>

          {onRemove && (
            <button
              onClick={onRemove}
              className="text-xs text-red-500 mt-2 hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <div className="text-right font-semibold text-lg">
        ₹{(quantity * price).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItemCard;
