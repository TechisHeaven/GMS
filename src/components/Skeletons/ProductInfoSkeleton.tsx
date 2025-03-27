export const ProductInformationSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 animate-pulse w-full">
      {/* Image Gallery Skeleton */}
      <div className="md:w-1/2">
        <div className=" rounded-lg p-4">
          <div className="w-full aspect-square bg-gray-300 rounded-lg mb-4 h-full"></div>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-300 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div className="md:w-1/2">
        <div className=" rounded-lg p-6">
          <div className="flex items-center gap-2 text-gray-400 mb-4">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>

          <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 w-4 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
          </div>

          <div className="h-8 w-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-24 bg-gray-300 rounded mb-6"></div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 h-12 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 h-12 bg-gray-300 rounded-lg"></div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="h-6 w-48 bg-gray-300 rounded"></div>
          </div>

          <div className="border-t pt-6">
            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-full bg-gray-300 rounded"></div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>
            <div className="h-4 w-48 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
