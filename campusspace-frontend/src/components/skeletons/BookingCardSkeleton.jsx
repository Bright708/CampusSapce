import Skeleton from "react-loading-skeleton";

const BookingCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 dark:bg-slate-900 dark:border-slate-700">
      <div className="w-fit">
        <Skeleton width={100} height={26} borderRadius={9999} />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton width={220} height={26} />
        <div className="flex items-center gap-2">
          <Skeleton circle width={16} height={16} />
          <Skeleton width={240} height={14} />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton circle width={16} height={16} />
          <Skeleton width={200} height={14} />
        </div>
      </div>

      <Skeleton height={48} borderRadius={16} />
    </div>
  );
};

export default BookingCardSkeleton;
