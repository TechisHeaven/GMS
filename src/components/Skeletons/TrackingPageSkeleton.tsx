import { Clock } from "lucide-react";
const TrackingPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="max-w-2xl mx-auto py-4">
        <h1 className="text-xl font-semibold bg-gray-200 rounded w-48 h-6"></h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Estimated Time Skeleton */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 bg-gray-200 rounded w-40"></div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Tracking Steps Skeleton */}
        <div className="bg-white rounded-lg p-6">
          <div className="space-y-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="relative">
                {index < 4 && (
                  <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="w-32 h-5 bg-gray-200 rounded"></div>
                        <div className="w-48 h-4 bg-gray-200 rounded mt-2"></div>
                      </div>
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPageSkeleton;
