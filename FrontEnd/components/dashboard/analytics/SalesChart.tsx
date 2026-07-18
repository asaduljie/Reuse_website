"use client";

import {

    ResponsiveContainer,

    LineChart,

    Line,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

} from "recharts";

interface SalesData {

    month: string;

    revenue: number;

}

interface SalesChartProps {

    data: SalesData[];

}

export default function SalesChart({

    data,

}: SalesChartProps) {

    return (

        <div className="bg-white rounded-3xl shadow-sm p-8">

            <div className="mb-8">

                <h2 className="text-2xl font-bold">

                    Sales Overview

                </h2>

                <p className="text-gray-500 mt-2">

                    Monthly revenue overview.

                </p>

            </div>

            <ResponsiveContainer

                width="100%"

                height={350}

            >

                <LineChart

                    data={data}

                >

                    <CartesianGrid

                        strokeDasharray="3 3"

                    />

                    <XAxis

                        dataKey="month"

                    />

                    <YAxis/>

                    <Tooltip/>

                    <Line

                        type="monotone"

                        dataKey="revenue"

                        stroke="#145A3B"

                        strokeWidth={4}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}
