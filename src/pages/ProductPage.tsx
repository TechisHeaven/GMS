import ProductInformationContainer from "../components/ProductInformationContainer";
import { product } from "../constants/product";

export default function ProductPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ProductInformationContainer product={product} />
    </div>
  );
}
