import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProductContainer from "../components/ProductContainer";
import BannerPromo from "../components/BannerPromo";
import { useLocation } from "react-router-dom";
import { useFetchProducts } from "../service/product.service";
import EmptyStateProduct from "../components/EmptyStateProduct";
import { useFetchCategoryById } from "../service/categories.service";

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

export default function ProductsPage() {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("category");
  const { data: products, isLoading } = useFetchProducts(id);
  const { data: category, isLoading: isCategoryLoading } = useFetchCategoryById(
    id!
  );
  const [open, setOpen] = useState<boolean>(false);

  function handleSort(filter: SortFilterType) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("sortBy", filter.sortAttribute);
    window.history.replaceState(null, "", "?" + queryParams.toString());
    setOpen(false);
  }

  const filteredProducts =
    !isLoading && products?.length > 0
      ? category
        ? products?.filter((product: typeof products) =>
            product.categories.some(
              (cat: typeof product.categories) => cat?._id === category?._id
            )
          )
        : products
      : products;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-display">
      <BannerPromo
        data={{
          id: 2,
          title: "You can enjoy a 5% of discount using our health card",
          info: "Membership Card",
          image: "../clock.png",
          banner:
            "https://imgs.search.brave.com/gbpOSQdaKFOOp35PO4vcG6KkwalUHejC9MK2cFUKE94/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9v/cmFuZ2UtdGV4dHVy/ZV85NTY3OC03My5q/cGc_c2VtdD1haXNf/aHlicmlk",
          textColor: "#a95716",
          bgColor: "#ffbf3c",
        }}
      />
      <div className="my-8">
        <h1 className="text-4xl font-bold mb-2 capitalize">
          {isCategoryLoading ? (
            <div className="animate-pulse bg-gray-200 h-10 w-40 rounded-md"></div>
          ) : category ? (
            category.name
          ) : (
            "All Items"
          )}
        </h1>
        <h6 className="text-base font-semibold mb-2 capitalize">
          {isCategoryLoading ? (
            <div className="animate-pulse bg-gray-200 h-6 w-64 rounded-md"></div>
          ) : (
            category && category.description
          )}
        </h6>
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

      {!filteredProducts || filteredProducts?.length <= 0 ? (
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
            : filteredProducts?.map(
                (product: typeof filteredProducts, index: number) => (
                  <ProductContainer key={index} product={product} />
                )
              )}
        </div>
      )}
    </div>
  );
}
