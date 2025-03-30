import React from "react";

const ProfileInfoSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
        <div className="w-full space-y-2">
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoSkeleton;
