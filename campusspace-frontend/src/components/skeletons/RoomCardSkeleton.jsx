import Skeleton from "react-loading-skeleton";

const RoomCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300">
      <Skeleton height={224} />
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <Skeleton width={220} height={28} />
          <div className="flex items-center gap-2">
            <Skeleton circle width={16} height={16} />
            <Skeleton width={140} height={14} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton circle width={16} height={16} />
            <Skeleton width={120} height={14} />
          </div>
          <Skeleton width={90} height={28} borderRadius={9999} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton width={72} height={26} borderRadius={9999} />
          <Skeleton width={90} height={26} borderRadius={9999} />
          <Skeleton width={78} height={26} borderRadius={9999} />
        </div>

        <Skeleton height={48} borderRadius={16} />
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
