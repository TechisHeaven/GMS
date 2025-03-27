import { Zap } from "lucide-react";
import { StoreType } from "../types/store";
import { Link } from "react-router-dom";

interface OtherStoreContainerProps {
  store: {
    storeDetails: StoreType;
    _id: string;
    price: number;
  };
}

const OtherStoreContainer = ({ store }: OtherStoreContainerProps) => {
  return (
    <Link
      to={`/product/${store._id}`}
      className="inline-flex items-center justify-between w-full p-4 bg-white rounded-md hover:outline-1 outline-gray-200 transition-all"
    >
      <div className="inline-flex items-start gap-2">
        <img
          src={`../${store.storeDetails?.image}`}
          width={40}
          height={40}
          className="rounded-full"
          alt=""
        />
        <div>
          <h6 className="text-xl font-semibold">{store.storeDetails?.name}</h6>
          <p className="inline-flex items-center gap-2 text-sm text-gray-600">
            <Zap
              color="transparent"
              className="-rotate-12 fill-yellow"
              size={16}
            />
            {store.storeDetails?.description}
          </p>
        </div>
      </div>
      <div>
        <p className="text-main-text font-semibold">₹{store.price}</p>
      </div>
    </Link>
  );
};

export default OtherStoreContainer;
