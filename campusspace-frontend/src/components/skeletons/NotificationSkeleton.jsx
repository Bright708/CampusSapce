import Skeleton from "react-loading-skeleton";

const NotificationSkeleton = ({ count = 4 }) => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: count }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="flex items-center justify-between p-4 border-b"
        >
          <div className="flex-1">
            <Skeleton width="90%" height={14} />
          </div>
          <Skeleton width={56} height={28} borderRadius={10} />
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
