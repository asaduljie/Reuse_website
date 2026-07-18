"use client";

import { useEffect, useState } from "react";
import SuperAdminHeader from "../../../../components/dashboard/super-admin/SuperAdminHeader";
import ActivityFilter from "../../../../components/dashboard/activity/ActivityFilter";
import ActivityTable from "../../../../components/dashboard/activity/ActivityTable";
import ActivityDetail from "../../../../components/dashboard/activity/ActivityDetail";
import { getLogs, ActivityLog } from "../../../../services/activityService";

export default function SuperAdminActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  const loadData = () => {
    setLogs(getLogs());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter logs logic
  const filtered = logs.filter((log) => {
    const matchSearch =
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase()) ||
      log.ip.includes(search);
    
    const normRole = roleFilter.toUpperCase() === "ALL" ? "ALL" : roleFilter;
    const matchRole = normRole === "ALL" || log.role === roleFilter;

    const normAction = actionFilter.toUpperCase() === "ALL" ? "ALL" : actionFilter;
    const matchAction = normAction === "ALL" || log.action === actionFilter;

    let matchDate = true;
    if (dateFrom) {
      matchDate = matchDate && new Date(log.createdAt) >= new Date(dateFrom);
    }
    if (dateTo) {
      matchDate = matchDate && new Date(log.createdAt) <= new Date(dateTo + "T23:59:59.999Z");
    }

    return matchSearch && matchRole && matchAction && matchDate;
  });

  return (
    <div className="space-y-8">
      <SuperAdminHeader
        title="Audit Logs Aktivitas Global"
        breadcrumbs={[{ label: "Activity Logs" }]}
      />

      <ActivityFilter
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        actionFilter={actionFilter}
        setActionFilter={setActionFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
      />

      <ActivityTable
        logs={filtered}
        onSelect={(log) => setSelectedLog(log)}
      />

      <ActivityDetail
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
      />
    </div>
  );
}
