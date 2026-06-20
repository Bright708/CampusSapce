import Skeleton from "react-loading-skeleton";

const TableRowSkeleton = ({ rows = 6 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b">
          <td className="p-4">
            <Skeleton width={180} height={16} />
          </td>
          <td className="p-4">
            <Skeleton width={140} height={16} />
          </td>
          <td className="p-4">
            <Skeleton width={110} height={18} borderRadius={9999} />
          </td>
          <td className="p-4">
            <Skeleton width={120} height={36} borderRadius={12} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableRowSkeleton;
