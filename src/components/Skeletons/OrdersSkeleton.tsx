import React from "react";

const OrdersSkeleton = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <div
      key={index}
      className="border-b border-b-gray-200 pb-6 last:border-b-0 last:pb-0 animate-pulse"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, itemIndex) => (
          <div key={itemIndex} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  ));
};

export default OrdersSkeleton;
