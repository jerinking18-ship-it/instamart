import { ClockIcon, CheckIcon, TruckIcon, PackageIcon } from "lucide-react";

export default function OrderTimeLine({ order }: { order: any }) {
  const allStatuses = [
    "Placed",
    "Confirmed",
    "Assigned",
    "Packed",
    "Out for Delivery",
    "Delivered",
  ];
  const currentIdx = allStatuses.indexOf(order.status);

  const statusIcons: any = {
    Placed: ClockIcon,
    Confirmed: CheckIcon,
    Assigned: TruckIcon,
    Packed: PackageIcon,
    "Out for Delivery": TruckIcon,
    Delivered: CheckIcon,
  };

  return (
    <div className="bg-lime-50 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-lime-950 mb-6">
        Delivery Progress
      </h2>
      <div className="space-y-0">
        {allStatuses.map((status, i) => {
          const Icon = statusIcons[status] || PackageIcon;
          const isCompleted = i <= currentIdx;
          const isCurrent = i === currentIdx;

          const historyEntry = order.statusHistory.find(
            (h: any) => h.status === status,
          );

          return (
            <div key={status} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`size-9 rounded-full flex items-center justify-center shrink-0 ${isCompleted ? "bg-lime-950 text-white" : "bg-zinc-400/20 text-lime-950"} ${isCurrent ? "ring-4 ring-zinc-400/50" : ""}`}
                >
                  <Icon className="size-4" />
                </div>
                {i < allStatuses.length - 1 && (
                  <div
                    className={`w-0.5 h-12 ${i < currentIdx ? "bg-lime-950" : "bg-zinc-500/20"}`}
                  />
                )}
              </div>
              <div className="pb-6">
                <p
                  className={`text-sm font-semibold ${isCompleted ? "text-lime-950" : "text-zinc-500"}`}
                >
                  {status}
                </p>
                {historyEntry && (
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {new Date(historyEntry.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
