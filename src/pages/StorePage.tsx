// const { data: products, isLoading, isError } = useFetchProductsStore(id!);
// const { data: store, isLoading: isStoreLoading } = useFetchStoreById(id!);
import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import ProductContainer from "../components/ProductContainer";
import { useParams } from "react-router-dom";
import EmptyStateProduct from "../components/EmptyStateProduct";
import {
  useFetchProductsStore,
  useFetchStoreById,
} from "../service/store.service";
import {
  getStoreStatus,
  StoreStatusMessage,
} from "../components/Store/StoreStatus";
import { DUMMY_IMAGE_STORE } from "../constants/store";

type SortFilterType = {
  title: string;
  sortAttribute: string;
};
const filters = [
  { title: "Relevance (default)", sortAttribute: "relevance" },
  { title: "Delivery Time", sortAttribute: "deliveryTimeAsc" },
  { title: "Rating", sortAttribute: "modelBasedRatingDesc" },
  { title: "Cost: Low to High", sortAttribute: "costForTwoAsc" },
  { title: "Cost: Hight to Low", sortAttribute: "costForTwoDesc" },
];

export default function StorePage() {
  const { id } = useParams();
  const { data: products, isLoading } = useFetchProductsStore(id!);
  const { data: store, isLoading: isStoreLoading } = useFetchStoreById(id!);
  const [open, setOpen] = useState<boolean>(false);

  function handleSort(filter: SortFilterType) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("sortBy", filter.sortAttribute);
    window.history.replaceState(null, "", "?" + queryParams.toString());
    setOpen(false);
  }

  function handleCall(phoneNumber: string) {
    window.open(`tel:${phoneNumber}`);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-display">
      <div className="my-8">
        <div>
          {isStoreLoading ? (
            <div className="flex flex-col gap-4 items-start">
              <div className="w-40 h-40 rounded-full bg-gray-200 animate-pulse" />
              <div className="flex flex-col gap-2">
                <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-60 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-52 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse mt-2" />
              </div>
            </div>
          ) : (
            store && (
              <div>
                <img
                  src={store.image || DUMMY_IMAGE_STORE}
                  alt={store.name}
                  className="w-40 h-40 rounded-full aspect-square object-cover border border-gray-200"
                />
                <div className="px-4 p-2 flex flex-col gap-1 items-start">
                  <h1 className="text-2xl font-semibold">{store.name}</h1>
                  <h5 className="text-base font-semibold text-gray-600">
                    {store.description}
                  </h5>
                  <h5 className="text-sm font-semibold text-gray-600">
                    {store.location}
                  </h5>
                  <h5>
                    Ordering Time: {store.openingTime} - {store.closingTime}
                  </h5>
                  <div className="inline-flex items-center gap-2">
                    <StoreStatusMessage
                      status={getStoreStatus(
                        store.openingTime,
                        store.closingTime
                      )}
                    />
                    <button
                      onClick={() => handleCall(store.contactNumber)}
                      className="inline-flex items-center gap-2 text-gray-600 text-xs font-semibold border rounded-full px-4 p-2 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <Phone size={12} />
                      Call
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="flex items-center gap-2 border-gray-300 shadow-xs text-black text-sm border rounded-full px-4 p-2 cursor-pointer font-semibold"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setOpen(!open)}
          >
            Sort by
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {open && (
          <div
            className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              {filters.map((filter, index) => (
                <button
                  key={index}
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left cursor-pointer my-1 hover:bg-gray-50 transition-colors"
                  role="menuitem"
                  tabIndex={-1}
                  id={`menu-item-${index}`}
                  onClick={() => handleSort(filter)}
                >
                  {filter.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {(!isLoading && !products) || products?.length <= 0 ? (
        <EmptyStateProduct />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-200 h-60 rounded-md"
                ></div>
              ))
            : products?.map((product: typeof products, index: number) => (
                <ProductContainer key={index} product={product} />
              ))}
        </div>
      )}
    </div>
  );
}
