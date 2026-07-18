"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface StatusData {
    name: string;
    value: number;
}

interface Props {
    data: StatusData[];
}

const COLORS = [
    "#16a34a", // Completed / Selesai
    "#3b82f6", // Seller Confirmed
    "#f59e0b", // Pending
    "#8b5cf6", // Packing
    "#ef4444", // Cancelled
    "#06b6d4", // Ready to Pickup
    "#ec4899", // Refund
];

const STATUS_COLORS: { [key: string]: string } = {
  completed: "#16a34a",
  selesai: "#16a34a",
  "seller confirmed": "#3b82f6",
  packing: "#8b5cf6",
  "ready to pickup": "#06b6d4",
  pending: "#f59e0b",
  cancelled: "#ef4444",
  refund: "#ec4899",
};

const getStatusColor = (statusName: string, index: number) => {
  const normalized = statusName.toLowerCase().trim();
  return STATUS_COLORS[normalized] || COLORS[index % COLORS.length];
};

export default function OrderStatusChart({ data }: Props) {
    const totalOrders = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Order Status</h2>
                <p className="text-gray-500 mt-1 text-sm">
                    Distribusi status seluruh pesanan.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Chart Container */}
                <div className="md:col-span-7 relative flex items-center justify-center h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={75}
                                outerRadius={105}
                                paddingAngle={3}
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={getStatusColor(entry.name, index)}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    borderRadius: "12px",
                                    border: "none",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                }}
                                formatter={(value: any) => [`${value} Pesanan`, "Jumlah"]}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Central text displaying total */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-extrabold text-gray-800">
                            {totalOrders}
                        </span>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
                            Orders
                        </span>
                    </div>
                </div>

                {/* Legend list */}
                <div className="md:col-span-5 space-y-3 max-h-[280px] overflow-y-auto pr-2">
                    {data.map((item, index) => {
                        const percentage = totalOrders > 0 
                            ? ((item.value / totalOrders) * 100).toFixed(1) 
                            : "0.0";
                        const color = getStatusColor(item.name, index);

                        return (
                            <div 
                                key={item.name} 
                                className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div className="flex items-center space-x-3 min-w-0">
                                    <div 
                                        className="w-3.5 h-3.5 rounded-full shrink-0" 
                                        style={{ backgroundColor: color }}
                                    />
                                    <span className="text-sm font-medium text-gray-700 truncate capitalize">
                                        {item.name}
                                    </span>
                                </div>
                                <div className="text-right ml-4 shrink-0">
                                    <span className="text-sm font-bold text-gray-900 block">
                                        {item.value}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium">
                                        {percentage}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
