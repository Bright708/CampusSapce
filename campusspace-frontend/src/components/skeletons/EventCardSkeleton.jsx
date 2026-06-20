import Skeleton from "react-loading-skeleton";

const EventCardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <Skeleton height={224} />
      <div className="p-6 flex flex-col gap-4">
        <div>
          <Skeleton width={220} height={28} />
          <div className="mt-2">
            <Skeleton width={320} height={14} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <Skeleton width={90} height={14} />
          <Skeleton width={110} height={14} />
          <Skeleton width={120} height={14} />
          <Skeleton width={140} height={14} />
        </div>

        <div className="border-t pt-4 flex justify-between">
          <section>
            <Skeleton width={90} height={12} />
            <div className="mt-2">
              <Skeleton width={160} height={16} />
            </div>
          </section>
          <Skeleton width={150} height={40} borderRadius={12} />
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
