import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../components/Cart";

export default function CartPage() {
  const initialItems = [
    {
      id: 1,
      name: "Italian Avocado",
      quantity: 1,
      price: 14.29,
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=120&h=120&fit=crop",
      tag: "Local shop",
    },
    {
      id: 2,
      name: "Fresh Carrots",
      quantity: 2,
      price: 27.29,
      image:
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=120&h=120&fit=crop",
      tag: "Local shop",
    },
    {
      id: 3,
      name: "Beetroot",
      quantity: 1,
      price: 17.29,
      image:
        "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=120&h=120&fit=crop",
      tag: "Local shop",
    },
  ];

  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();

  const handleIncrement = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 2.0;
  const total = subtotal + deliveryFee;

  return items.length <= 0 ? (
    <EmptyCart />
  ) : (
    <div className="min-h-screen bg-gray-50">
      <>
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-xl font-semibold">
            Shopping Cart ({items.length})
          </h1>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex-row flex gap-2">
            {/* Cart Items */}
            <div className="divide-y bg-white divide-gray-100 flex-1 rounded-lg shadow-sm">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.quantity} pcs</p>
                    <p className="text-sm text-gray-500">{item.tag}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white p-4 space-y-4 w-72 rounded-lg shadow-sm">
              <div className="flex justify-between items-center text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
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
