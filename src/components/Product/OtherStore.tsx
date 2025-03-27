import { ArrowRight } from "lucide-react";
import OtherStoreContainer from "../OtherStoreContainer";
import { StoreType } from "../../types/store";

type StoresDataProps = {
  storeDetails: StoreType;
  _id: string;
  price: number;
};

interface OtherStoresInterface {
  stores: StoresDataProps[];
  isLoading: boolean;
}

const OtherStores = ({ stores, isLoading }: OtherStoresInterface) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Others Store</h3>
        <button className="text-orange-600 flex items-center">
          See more <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 h-32 rounded-md"
              ></div>
            ))
          : stores?.length > 0 &&
            stores?.map((store: StoresDataProps, index: number) => (
              <OtherStoreContainer key={index} store={store} />
            ))}
      </div>
    </div>
  );
};

export default OtherStores;
