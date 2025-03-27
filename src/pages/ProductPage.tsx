import ProductInformationContainer from "../components/ProductInformationContainer";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchProduct,
  useFetchSimilarProducts,
  useRelatedProducts,
} from "../service/product.service";
import OtherStores from "../components/Product/OtherStore";
import SimilarProductsSection from "../components/Product/SimilarProductsSection";
import { ProductInformationSkeleton } from "../components/Skeletons/ProductInfoSkeleton";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useFetchProduct(id!);
  const { data: similarProducts, isLoading: isSimilarProductsLoading } =
    useRelatedProducts(id!);
  const { data: similarStores, isLoading: isStoreLoading } =
    useFetchSimilarProducts(id!);

  if (!id || isError) navigate("/");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {isLoading ? (
        <ProductInformationSkeleton />
      ) : (
        <ProductInformationContainer product={product} />
      )}
      <OtherStores stores={similarStores} isLoading={isStoreLoading} />
      <SimilarProductsSection
        isLoading={isSimilarProductsLoading}
        products={similarProducts}
      />
    </div>
  );
}
