"use client";

import { useEffect, useState } from "react";
import {
  getLogs, ActivityLog,
} from "../../../../services/activityService";
import ActivityHeader from "../../../../components/dashboard/activity/ActivityHeader";
import ActivityFilter from "../../../../components/dashboard/activity/ActivityFilter";
import ActivityTable from "../../../../components/dashboard/activity/ActivityTable";
import ActivityDetail from "../../../../components/dashboard/activity/ActivityDetail";

export default function ActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filtered, setFiltered] = useState<ActivityLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const data = getLogs();
    setLogs(data);
  }, []);

  useEffect(() => {
    let result = [...logs];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) => l.userName.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
      );
    }
    if (roleFilter !== "ALL") {
      result = result.filter((l) => l.role === roleFilter);
    }
    if (actionFilter !== "ALL") {
      result = result.filter((l) => l.action === actionFilter);
    }
    if (dateFrom) {
      result = result.filter((l) => new Date(l.createdAt) >= new Date(dateFrom));
    }
    if (dateTo) {
      result = result.filter((l) => new Date(l.createdAt) <= new Date(dateTo + "T23:59:59"));
    }

    setFiltered(result);
  }, [logs, search, roleFilter, actionFilter, dateFrom, dateTo]);

  return (
    <>
      <ActivityDetail log={selectedLog} onClose={() => setSelectedLog(null)} />

      <ActivityHeader total={filtered.length} />

      <ActivityFilter
        search={search} setSearch={setSearch}
        roleFilter={roleFilter} setRoleFilter={setRoleFilter}
        actionFilter={actionFilter} setActionFilter={setActionFilter}
        dateFrom={dateFrom} setDateFrom={setDateFrom}
        dateTo={dateTo} setDateTo={setDateTo}
      />

      <ActivityTable logs={filtered} onSelect={(l) => setSelectedLog(l)} />
    </>
  );
}
