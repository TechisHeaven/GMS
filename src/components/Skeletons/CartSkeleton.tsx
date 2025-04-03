const CartSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-xl font-semibold">Shopping Cart</h1>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex-row flex gap-2">
          {/* Cart Items Skeleton */}
          <div className="divide-y bg-white divide-gray-100 flex-1 rounded-lg shadow-sm">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="p-4 flex items-center gap-4 animate-pulse"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>

          {/* Cart Summary Skeleton */}
          <div className="bg-white p-4 space-y-4 w-72 rounded-lg shadow-sm animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
