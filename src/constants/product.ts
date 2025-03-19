import { ProductInfoType } from "../types/product";

export const products = [
  {
    id: 1,
    name: "Italian Avocado",
    price: 14.29,
    weight: "500 gm",
    image:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=250&h=250&fit=crop",
    tag: "Local shop",
    categories: [{ id: 1113, name: "fruits" }],
  },
  {
    id: 2,
    name: "Cold drinks",
    price: 6.29,
    weight: "500 gm",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=250&h=250&fit=crop",
    tag: "Sprite",
    categories: [
      { id: 1112, name: "snacks" },
      { id: 1115, name: "dairy" },
    ],
  },
  {
    id: 3,
    name: "Beetroot",
    price: 17.29,
    weight: "500 gm",
    image:
      "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=250&h=250&fit=crop",
    tag: "Local shop",
    categories: [{ id: 1111, name: "vegetables" }],
  },
  {
    id: 4,
    name: "Szam amm",
    price: 13.29,
    weight: "500 gm",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=250&h=250&fit=crop",
    tag: "Process food",
    categories: [{ id: 1111, name: "vegetables" }],
  },
  {
    id: 5,
    name: "Beef Mixed",
    price: 12.29,
    weight: "500 gm",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=250&h=250&fit=crop",
    tag: "Cut Bone",
    categories: [{ id: 1114, name: "eggs" }],
  },
];

export const product: ProductInfoType = {
  id: "MB3442",
  name: "Bobs red mill whole wheat organic flour",
  price: 29.12,
  rating: 4.5,
  reviews: 15,
  description:
    "Coconut Oil is a great-tasting, nutritious alternative to use when cooking or baking. Coconut Oil is a naturally rich source of medium chain triglycerides.",
  images: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
  ],
  categories: [
    { id: 1111, name: "vegitables" },
    { id: 1115, name: "dairy" },
    { id: 1112, name: "snacks" },
  ],
  store: "Bevmo grocery",
  soldCount: 100,
  soldTime: 35,
};
