import { ProductInfoType } from "./product";

export interface CartItem {
  _id?: string;
  product: string | ProductInfoType;
  price: number;
  userId?: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
