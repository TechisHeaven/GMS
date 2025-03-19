import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { StoreType } from "../types/store";

interface FeaturedStoreContainerProps {
  store: StoreType;
}
const FeaturedStoreContainer = ({ store }: FeaturedStoreContainerProps) => {
  return (
    <Link
      to={`/store/${store.id}`}
      className="bg-white w-full h-full rounded-2xl overflow-hidden"
    >
      <div
        className="banner bg-orange-500 w-full h-[100px]"
        style={{ background: `url(${store.banner})` }}
      ></div>
      <div className="info p-4">
        <img
          src={store.image || "./crush-orange.png"}
          width={50}
          height={50}
          className="rounded-full object-cover border border-white -mt-8"
          alt=""
        />
        <h6 className="text-xl font-semibold">{store.title}</h6>
        <p className="inline-flex items-center gap-2">
          <Zap
            color="transparent"
            className="-rotate-12 fill-yellow"
            size={16}
          />
          Delivery in {store.deliveryTime} minutes
        </p>
      </div>
    </Link>
  );
};

export default FeaturedStoreContainer;
