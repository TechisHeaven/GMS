// Helper to get store status
export const getStoreStatus = (openingTime: string, closingTime: string) => {
  if (!openingTime || !closingTime) return "closed";

  const now = new Date();
  const currentTime = now.getHours() + now.getMinutes() / 60;

  const openParts = openingTime?.split(":")?.map(Number);
  const closeParts = closingTime?.split(":")?.map(Number);

  if (openParts.length < 2 || closeParts.length < 2) return "closed";
  const [openHour, openMinute] = openParts;
  const [closeHour, closeMinute] = closeParts;
  const open = openHour + openMinute / 60;
  const close = closeHour + closeMinute / 60;

  if (currentTime >= open && currentTime < close) {
    if (close - currentTime <= 0.5) return "closing_soon"; // within 30 minutes
    return "open";
  } else if (open - currentTime > 0 && open - currentTime <= 1) {
    return "opening_soon"; // opens within 1 hour
  } else {
    return "closed";
  }
};

export const StoreStatusMessage = ({ status }: { status: string }) => {
  switch (status) {
    case "open":
      return (
        <span className="text-green-600 bg-green-200  px-4 p-2 rounded-2xl text-xs">
          Open Now
        </span>
      );
    case "closing_soon":
      return (
        <span className="text-yellow-600 bg-yellow-200  px-4 p-2 rounded-2xl text-xs">
          Closing Soon
        </span>
      );
    case "opening_soon":
      return (
        <span className="text-blue-600 bg-blue-200  px-4 p-2 rounded-2xl text-xs">
          Opens Soon
        </span>
      );
    case "closed":
    default:
      return (
        <span className="text-red-600 bg-red-200 px-4 p-2 rounded-2xl text-xs">
          Currently Closed
        </span>
      );
  }
};
