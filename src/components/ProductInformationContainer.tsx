import { ProductInfoType } from "../types/product";
import { useState } from "react";
import { Heart, Scale, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ProductInformationContainer = ({
  product,
}: {
  product: ProductInfoType;
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  function handleBuyNow() {
    navigate("/checkout");
  }
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Image Gallery */}
      <div className="md:w-1/2">
        <div className="bg-white rounded-lg p-4">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full aspect-square object-contain rounded-lg mb-4"
          />
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-teal-500" : ""
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="md:w-1/2">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <Clock className="h-4 w-4" />
            <span>270 : 13 : 10 : 32</span>
          </div>

          <div className="text-sm text-gray-500 mb-2">{product.store}</div>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          <div className="text-3xl font-bold mb-6">
            ${product.price}
            <sup>12$</sup>
          </div>

          <div className="flex gap-4 mb-6">
            <button className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg flex items-center justify-center gap-2">
              Add to bucket
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-main-bg text-main-text py-3 px-6 rounded-lg font-medium cursor-pointer"
            >
              Buy now
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <button className="flex items-center gap-2 text-gray-600">
              <Heart className="h-5 w-5" />
              ADD TO WISHLIST
            </button>
            <button className="flex items-center gap-2 text-gray-600">
              <Scale className="h-5 w-5" />
              Compare with other vendor
            </button>
          </div>

          <div className="border-t pt-6">
            <div className="text-sm text-gray-500 mb-2">SKU: {product.id}</div>
            <div className="text-sm mb-4">
              Categories:{" "}
              {product.categories.map((cat, i) => (
                <Link
                  key={i}
                  to={`/category/${cat.id}`}
                  className="text-teal-600 hover:underline"
                >
                  {cat.name}
                  {i < product.categories.length - 1 ? ", " : ""}
                </Link>
              ))}
            </div>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full"></div>
              <div className="w-8 h-8 bg-orange-100 rounded-full"></div>
              <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
            </div>
            <div className="text-red-500">
              {product.soldCount} sold in last {product.soldTime} hour
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInformationContainer;
