import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useFetchCategories } from "../../service/categories.service";

const FreaturedCatogeriesSection = () => {
  const { data, isLoading } = useFetchCategories();
  const categories = data?.featuredCategories || [];
  return (
    <div className="max-w-6xl mx-auto px-4 my-8">
      <div className="flex justify-between items-center gap-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 h-30 w-full rounded-md"
              ></div>
            ))
          : categories.map((category: typeof categories) => (
              <Link
                to={`/products/?category=${category._id}&cname=${category.name}`}
                key={category.name}
                className="flex flex-1 flex-col bg-white rounded-lg shadow p-3 h-28 relative"
              >
                <img
                  src={category.image}
                  alt={`${category.name} Icon`}
                  draggable={false}
                  className="w-16 h-16 absolute right-2 bottom-2 bg-cover"
                />
                <span className=" text-black text-base font-semibold">
                  {category.name}
                </span>
                <span className="text-xs text-gray-600 font-semibold capitalize">
                  {category.description}
                </span>
              </Link>
            ))}
        <Link
          to="/products"
          className="flex flex-col justify-center rounded-lg shadow p-3 h-28 bg-main-bg text-main-text font-semibold"
        >
          <div className="bg-white p-2 h-10 w-10 rounded-full">
            <ArrowRight />
          </div>{" "}
          See all
        </Link>
      </div>
    </div>
  );
};

export default FreaturedCatogeriesSection;
