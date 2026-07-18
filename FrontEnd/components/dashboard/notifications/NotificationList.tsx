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
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.label} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              {group.label}
            </span>
          </div>
          <div>
            {group.items.map((n) => (
              <NotificationItem key={n.id} notification={n} onRefresh={onRefresh} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
