import { ArrowRight } from "lucide-react";
import ProductContainer from "../ProductContainer";
import { ProductType } from "../../types/product";

interface SimilarProductsSectionProps {
  products: ProductType[];
  isLoading: boolean;
}
const SimilarProductsSection = ({
  products,
  isLoading,
}: SimilarProductsSectionProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Similar Product</h3>
        <button className="text-orange-600 flex items-center">
          See more <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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

export default SimilarProductsSection;
