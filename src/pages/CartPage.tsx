import { Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "../components/Cart";
import { useCart } from "../providers/cart.provider";
import { stopPropagation } from "../utils/mouseEvent.utils";
import CartSkeleton from "../components/Skeletons/CartSkeleton";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, isLoading } = useCart();
  const navigate = useNavigate();

  const handleIncrement = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    stopPropagation(e);
    const item = cart.find((item) => item._id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };
  const handleDecrement = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    stopPropagation(e);
    const item = cart.find((item) => item._id === id);
    if (item) {
      if (item.quantity === 1) {
        removeFromCart(id);
      } else {
        updateQuantity(id, item.quantity - 1);
      }
    }
  };

  const handleRemove = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    removeFromCart(id);
  };

  const handleCheckout = () => {
    navigate(`/checkout?isCartCheckout=true`);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal;

  return isLoading ? (
    <CartSkeleton />
  ) : cart.length <= 0 ? (
    <EmptyCart />
  ) : (
    <div className="min-h-screen bg-gray-50">
      <>
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-xl font-semibold">
            Shopping Cart ({cart.length})
          </h1>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex-row flex gap-2">
            {/* Cart cart */}
            <div className="divide-y bg-white divide-gray-100 flex-1 rounded-lg shadow-sm">
              {cart.map((item: any) => (
                <Link
                  to={`/product/${item.product._id}`}
                  key={item._id}
                  className="p-4 flex cart-center gap-4"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.quantity} pcs</p>
                    <p className="text-sm text-gray-500">
                      {item.product.tags.map((tag: string) => `${tag}, `)}
                    </p>
                    <div className="mt-2 flex cart-center gap-4">
                      <div className="flex cart-center gap-3">
                        <button
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                            handleDecrement(item._id, e)
                          }
                          className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                            handleIncrement(item._id, e)
                          }
                          className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-semibold">
                        ₹{item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleRemove(item._id, e)
                    }
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </Link>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white p-4 space-y-4 w-72 rounded-lg shadow-sm">
              <div className="flex justify-between cart-center text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between cart-center text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-teal-800 text-white py-3 rounded-lg font-medium cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
