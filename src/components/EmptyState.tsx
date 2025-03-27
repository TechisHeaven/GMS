import React from "react";
import { ShoppingBag, Package2 } from "lucide-react";

interface EmptyStateProps {
  type: "products" | "cart";
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        {type === "products" ? (
          <Package2 className="w-12 h-12 text-gray-400" />
        ) : (
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        )}
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
        {title}
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-8">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-teal-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
