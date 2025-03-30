const ScreenLoader = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-screen bg-gray-100 text-center py-3 shadow-lg z-50 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-main-bg rounded-full"></div>
        <div className="w-3 h-3 bg-main-bg rounded-full"></div>
        <div className="w-3 h-3 bg-main-bg rounded-full"></div>
      </div>
      <p className="mt-2 text-sm text-gray-700">
        Please wait, GMS is Preparing...
      </p>
    </div>
  );
};

export default ScreenLoader;
