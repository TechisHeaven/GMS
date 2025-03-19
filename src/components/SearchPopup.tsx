import { Plus } from "lucide-react";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchCategories = [
  { name: "Meats", icon: "🥩" },
  { name: "Vegs", icon: "🥬" },
  { name: "Fruits", icon: "🍎" },
  { name: "Breads", icon: "🥖" },
];

const searchProducts = [
  {
    name: "Beetroot",
    price: 17.29,
    tag: "Local shop",
    image:
      "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=250&h=250&fit=crop",
  },
  {
    name: "Italian Avocado",
    price: 14.29,
    tag: "Local shop",
    image:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=250&h=250&fit=crop",
  },
  {
    name: "Don's Ginger",
    price: 27.29,
    tag: "Local shop",
    image:
      "https://images.unsplash.com/photo-1573414405949-c2cce7902c4c?w=250&h=250&fit=crop",
  },
];

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-fadeIn">
        <div className="p-6">
          <div className="flex items-center justify-between text-sm mb-6">
            <span className="text-gray-600">Current Location</span>
            <span className="font-medium text-gray-900">California, USA ▼</span>
          </div>

          <div className="flex justify-between mb-8">
            {searchCategories.map((category, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                  {category.icon}
                </div>
                <span className="text-sm text-gray-600">{category.name}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">You might need</h3>
              <button className="text-orange-600 text-sm">See more</button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {searchProducts.map((product, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                  <div className="text-sm text-gray-900 font-medium mb-1">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    ({product.tag})
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold">
                      ${product.price}
                      <sup>29$</sup>
                    </div>
                    <button className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm font-medium mb-1">Grocery</div>
              <div className="text-xs text-gray-600">By 5:30pm</div>
              <div className="text-xs text-orange-600 mt-1">Free delivery</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm font-medium mb-1">Wholesale</div>
              <div className="text-xs text-gray-600">By 5:00pm</div>
              <div className="text-xs text-red-600 mt-1">Free delivery</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
    </>
  );
}
