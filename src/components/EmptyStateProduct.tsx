import EmptyState from "./EmptyState";

const EmptyStateProduct = () => {
  return (
    <EmptyState
      type="products"
      title="No products available"
      description="We're currently restocking our inventory. Please check back later for fresh products!"
      actionLabel="Refresh Page"
      onAction={() => window.location.reload()}
    />
  );
};

export default EmptyStateProduct;
