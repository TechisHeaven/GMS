import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { ProductInfoType, ProductType } from "../types/product";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { stopPropagation } from "../utils/mouseEvent.utils";
import { useCart } from "../providers/cart.provider";

const priceContainerStyles = (
  isQuantityMoreThenZero: boolean
): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  backgroundColor: isQuantityMoreThenZero
    ? "var(--color-main-bg)"
    : "var(--color-placeholer-bg)",
  borderRadius: "0.5rem",
  padding: "0.25rem",
  width: "100%",
  justifyContent: isQuantityMoreThenZero ? "space-between" : "center",
  height: "4rem",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  clipPath: "polygon(0 0, 49% 23%, 100% 0, 100% 80%, 48% 100%, 0 84%)",
  transition: ".2s all ease",
});

const buttonStyles = (isQuantityMoreThenZero: boolean): CSSProperties => ({
  padding: "0.25rem",
  cursor: "pointer",
  borderRadius: "50%",
  marginTop: isQuantityMoreThenZero ? "0rem" : "1rem",
  border: isQuantityMoreThenZero ? "1px solid black" : "0px",
});

const quantityStyles = (animate: boolean): CSSProperties => ({
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  marginTop: "1rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
  userSelect: "none",
  animation: animate ? "quantity-increase 0.3s ease-in-out" : "none",
});

const ProductContainer = ({ product }: { product: ProductInfoType }) => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const cartItem = cart.find(
    (item) =>
      typeof item.product !== "string" && item.product._id === product._id
  );
  const quantity = cartItem?.quantity ?? 0;
  const [animate, setAnimate] = useState(false);

  const handleIncrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    setAnimate(true);
    const newQuantity = quantity + 1;
    if (newQuantity === 1) {
      addToCart({
        price: product.price,
        product: product._id,
        quantity: 1,
      });
    } else {
      if (cartItem) updateQuantity(cartItem._id!, newQuantity);
    }
  };

  const handleDecrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    if (quantity > 0) {
      setAnimate(true);
      const newQuantity = quantity - 1;
      if (newQuantity === 0 && cartItem) {
        removeFromCart(cartItem._id!);
      } else {
        if (cartItem) updateQuantity(cartItem._id!, newQuantity);
      }
    }
  };

  const isQuantityMoreThenZero = quantity > 0;

  return (
    <Link
      to={`/product/${product._id}`}
      key={product.name}
      className="bg-white rounded-lg product-container font-semibold p-3 shadow-sm flex items-center flex-col"
    >
      <style>
        {`
          @keyframes quantity-increase {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h4 className=" text-lg mb-1">{product.name}</h4>
      <p className="text-sm text-gray-500 mb-2">{product.weight} gm</p>
      <div className="flex flex-col justify-between items-center w-full">
        <span className="font-bold text-3xl">
          {Math.floor(product.price)}.
          <span className="text-base align-text-top">
            {(product.price % 1).toFixed(2).substring(2)}₹
          </span>
        </span>
        <div
          style={priceContainerStyles(isQuantityMoreThenZero)}
          onClick={stopPropagation}
        >
          {isQuantityMoreThenZero && (
            <button
              className="p-1 cursor-pointer border rounded-full"
              onClick={handleDecrease}
            >
              <Minus className="h-6 w-6" />
            </button>
          )}
          {isQuantityMoreThenZero && (
            <span
              style={quantityStyles(animate)}
              onAnimationEnd={() => setAnimate(false)}
            >
              {quantity}
            </span>
          )}
          <button
            style={buttonStyles(isQuantityMoreThenZero)}
            onClick={handleIncrease}
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductContainer;
