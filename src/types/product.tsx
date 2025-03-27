import { StoreType } from "./store";

export type ProductType = {
  _id: string;
  name: string;
  image?: string;
  images?: string;
  price: number;
  weight: string;
};

export type ProductInfoType = {
  _id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  tags: string[];
  categories: { _id: string; name: string }[];
  store: StoreType;
  soldCount: number;
  soldTime: number;
  sku: string;
  weight: number;
};
