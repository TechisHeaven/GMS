import { ArrowRight } from "lucide-react";
import ProductContainer from "../ProductContainer";
import { useFetchFeaturedProducts } from "../../service/product.service";
import { ProductType } from "../../types/product";

const FeaturedProductSection = () => {
  const { data: products, isLoading } = useFetchFeaturedProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">You might need</h3>
        <button className="text-orange-600 flex items-center">
          See more <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 h-60 rounded-md"
              ></div>
            ))
          : products?.map((product: ProductType, index: number) => (
              <ProductContainer key={index} product={product} />
            ))}
      </div>
    </div>
  );
};

export default FeaturedProductSection;
