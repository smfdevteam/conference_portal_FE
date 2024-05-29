const Full_Screen_Skeleton_Loader = () => {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="bg-gray-300 h-12 w-full rounded-md animate-pulse"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-gray-300 h-8 w-3/4 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-4 w-full rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-4 w-full rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-4 w-5/6 rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-300 h-8 w-1/2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-4 w-full rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-4 w-full rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-4 w-3/4 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="bg-gray-300 h-16 w-full rounded-md animate-pulse"></div>
    </div>
  );
};

export default Full_Screen_Skeleton_Loader;
