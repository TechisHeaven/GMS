export type ProductType = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  weight: string;
};

export type ProductInfoType = {
  id: string | number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  categories: { id: string | number; name: string }[];
  store: string;
  soldCount: number;
  soldTime: number;
};
