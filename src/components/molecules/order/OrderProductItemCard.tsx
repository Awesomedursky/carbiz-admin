import { OrderItem } from "@/types/order.type";
import React from "react";


const OrderProductItemCard: React.FC<{ orderItem: OrderItem }> = ({
  orderItem,
}) => {
  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  return (
    <div className="bg-white border-b border-gray-200 last:border-0 py-6">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={orderItem.image}
              alt={orderItem.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h3 className="text-gray-900 font-medium text-sm leading-tight mb-2 font-source">
            {orderItem.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(orderItem.price)}
            </span>
            {orderItem.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(orderItem.originalPrice)}
              </span>
            )}
          </div>

          {/* Color/Description */}
          <p className="text-sm text-gray-600">Color - {orderItem.color}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItemCard;
