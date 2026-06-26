import Skeleton from "react-loading-skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-blue-950">
        <Skeleton width={240} height={44} />
      </h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white rounded-3xl shadow p-8 flex flex-col items-center dark:bg-slate-900">
          <Skeleton circle width={144} height={144} />
          <div className="mt-6">
            <Skeleton width={180} height={30} />
          </div>
          <div className="mt-2">
            <Skeleton width={120} height={16} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8 lg:col-span-2 dark:bg-slate-900">
          <div className="space-y-6">
            <Skeleton width={140} height={16} />
            <Skeleton height={52} borderRadius={16} />
            <Skeleton width={140} height={16} />
            <Skeleton height={52} borderRadius={16} />
            <Skeleton width={140} height={16} />
            <Skeleton height={52} borderRadius={16} />
            <Skeleton height={48} borderRadius={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
