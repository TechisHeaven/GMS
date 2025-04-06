import FeaturedStoreContainer from "../FeaturedStoreContainer";
import { useFetchFeaturedStore } from "../../service/store.service";
import { StoreType } from "../../types/store";

const FeaturedStoreSection = () => {
  const { data: stores, isLoading } = useFetchFeaturedStore(3);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Featured Store</h3>
      </div>

      <div className="grid  md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 h-60 rounded-md"
              ></div>
            ))
          : stores?.map((store: StoreType, index: number) => (
              <FeaturedStoreContainer key={index} store={store} />
            ))}
      </div>
    </div>
  );
};

export default FeaturedStoreSection;
