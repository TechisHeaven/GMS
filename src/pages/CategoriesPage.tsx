import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useParams } from "react-router-dom";
import ProductContainer from "../components/ProductContainer";
import { products } from "../constants/product";

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

const categories = [
  {
    id: 1111,
    name: "Vegetables",
    type: "vegetables",
    subtitle: "Fresh and organic vegetables for a healthy lifestyle.",
  },
  {
    id: 1112,
    name: "Snacks & Breads",
    type: "snacks",
    subtitle: "Tasty snacks and breads to satisfy your cravings.",
  },
  {
    id: 1113,
    name: "Fruits",
    type: "fruits",
    subtitle: "Juicy and delicious fruits for every season.",
  },
  {
    id: 1114,
    name: "Chicken & Eggs",
    type: "eggs",
    subtitle: "High-quality chicken and eggs for your protein needs.",
  },
  {
    id: 1115,
    name: "Milk & Dairy",
    type: "dairy",
    subtitle: "Fresh milk and dairy products for your daily nutrition.",
  },
];

export default function CategoriesPage() {
  let { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const category = categories.find(
    (category) => category.id === parseInt(id || "0") || category.type === id
  );

  function handleSort(filter: SortFilterType) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("sortBy", filter.sortAttribute);
    window.history.replaceState(null, "", "?" + queryParams.toString());
    setOpen(false);
  }

  const filteredProducts = category
    ? products.filter((product) =>
        product.categories.some((cat) => cat.id === category.id)
      )
    : products;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-display">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 capitalize">
          {category ? category.name : "All Items"}
        </h1>
        <h6 className="text-base font-semibold mb-2 capitalize">
          {category && category.subtitle}
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
        {filteredProducts.map((product, index) => (
          <ProductContainer key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
