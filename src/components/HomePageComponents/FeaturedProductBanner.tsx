import BannerSlider from "../BannerSlider";
import ProductInformationContainer from "../ProductInformationContainer";
import { useFetchFeaturedProducts } from "../../service/product.service";
import { ProductInformationSkeleton } from "../Skeletons/ProductInfoSkeleton";

const FeaturedProductBanner = () => {
  const { data: products, isLoading } = useFetchFeaturedProducts(1, 3);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BannerSlider itemsPerSlide={1} autoplayInterval={5000}>
        {isLoading ? (
          <ProductInformationSkeleton />
        ) : (
          products?.map((product: typeof products, index: number) => (
            <div
              key={index}
              className={`${index} py-4 bg-white my-8 rounded-2xl`}
            >
              <ProductInformationContainer product={product} />
            </div>
          ))
        )}
      </BannerSlider>
    </div>
  );
};

export default FeaturedProductBanner;
