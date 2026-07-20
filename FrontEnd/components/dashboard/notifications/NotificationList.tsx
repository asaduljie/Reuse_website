"use client";

import { Notification } from "../../../services/notificationService";
import NotificationItem from "./NotificationItem";
import NotificationEmpty from "./NotificationEmpty";

interface NotificationListProps {
  notifications: Notification[];
  onRefresh: () => void;
}

const groupByDate = (notifications: Notification[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const lastWeek = new Date(today.getTime() - 7 * 86400000);

  const groups: { label: string; items: Notification[] }[] = [
    { label: "Hari Ini", items: [] },
    { label: "Kemarin", items: [] },
    { label: "Minggu Ini", items: [] },
    { label: "Lebih Lama", items: [] },
  ];

  notifications.forEach((n) => {
    const d = new Date(n.createdAt);
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (day >= today) {
      groups[0].items.push(n);
    } else if (day >= yesterday) {
      groups[1].items.push(n);
    } else if (day >= lastWeek) {
      groups[2].items.push(n);
    } else {
      groups[3].items.push(n);
    }
  });

  return groups.filter((g) => g.items.length > 0);
};

export default function NotificationList({
  notifications,
  onRefresh,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return <NotificationEmpty />;
  }

  const groups = groupByDate(notifications);

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.label} className="space-y-4">
          <div className="flex items-center gap-3 px-1">
            <span className="text-[10px] font-black text-[#145A3B] uppercase tracking-widest bg-emerald-50/50 px-3.5 py-1.5 rounded-full border border-emerald-100/40">
              {group.label}
            </span>
            <div className="h-[1px] bg-gray-100 flex-1" />
          </div>
          <div className="bg-white rounded-3xl border border-gray-100/80 shadow-sm overflow-hidden divide-y divide-gray-50">
            {group.items.map((n) => (
              <NotificationItem key={n.id} notification={n} onRefresh={onRefresh} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
