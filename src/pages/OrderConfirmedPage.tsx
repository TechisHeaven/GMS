import Lottie from "react-lottie";
import animationData from "../assets/lotties/Animation - 1742275788323.json";
import { Link } from "react-router-dom";

export default function OrderConfirmedPage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //take id from params;
  const id = 1;

  return (
    <div style={{ height: "calc(100svh - 72px)" }}>
      <div className=" text-center p-4 flex flex-col gap-8 items-center justify-center  h-full">
        <div className="flex flex-col gap-2 items-center justify-center">
          {/* <img
            draggable={false}
            width={200}
            height={200}
            src="/paper-bag.png"
            alt="order-confirmed-bag"
          /> */}
          <Lottie options={defaultOptions} height={300} width={300} />
          <h1 className="font-semibold">
            Your order is on the way, we will delivered to you shortly, Thank
            you for shopping with us.
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className="text-semibold text-sm bg-main-bg text-main-text px-4 p-2"
          >
            Continue Shopping
          </Link>
          <Link
            to={`/track/${id}`}
            className="text-semibold text-sm text-main-text  px-4 p-2"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
