import Skeleton from "react-loading-skeleton";

const DashboardCardSkeleton = () => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-3">
        <Skeleton width={120} height={14} />
      </div>
      <Skeleton width={140} height={44} count={1} />
    </div>
  );
};

export default DashboardCardSkeleton;
