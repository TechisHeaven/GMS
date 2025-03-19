import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div
      className="flex items-center justify-center flex-col gap-2"
      style={{ height: "calc(100vh - 72px)" }}
    >
      <img src="./empty_cart.avif" alt="" className="w-2xs" />
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <h6>You can go to home page to view more Grocery Items</h6>
      </div>
      <Link
        to="/"
        className="bg-main-bg text-main-text px-4 p-2 font-semibold cursor-pointer"
      >
        Go Home
      </Link>
    </div>
  );
};

export default EmptyCart;
