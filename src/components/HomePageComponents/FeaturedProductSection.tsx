import { ArrowRight } from "lucide-react";
import ProductContainer from "../ProductContainer";
import { useFetchFeaturedProducts } from "../../service/product.service";
import { ProductInfoType } from "../../types/product";
import EmptyStateProduct from "../EmptyStateProduct";
import { useNavigate } from "react-router-dom";

const FeaturedProductSection = () => {
  const { data: products, isLoading } = useFetchFeaturedProducts();
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">You might need</h3>
        <button
          onClick={() => navigate("/products")}
          className="text-orange-600 flex items-center cursor-pointer"
        >
          See more <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      {products?.length <= 0 ? (
        <EmptyStateProduct />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-200 h-60 rounded-md"
                ></div>
              ))
            : products?.map((product: ProductInfoType, index: number) => (
                <ProductContainer key={index} product={product} />
              ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProductSection;
