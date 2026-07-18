"use client";

import { useMemo, useState, useEffect } from "react";
import CustomerHeader from "@/components/dashboard/customers/CustomerHeader";
import CustomerFilter from "@/components/dashboard/customers/CustomerFilter";
import CustomerTable, { CustomerWithStats } from "@/components/dashboard/customers/CustomerTable";
import Pagination from "@/components/dashboard/common/Pagination";
import EmptyState from "@/components/dashboard/common/EmptyState";
import { getCustomers } from "@/services/userService";
import { getOrders } from "@/services/orderService";

export default function CustomersPage() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [customersList, setCustomersList] = useState<CustomerWithStats[]>([]);
    const [loading, setLoading] = useState(true);

    const perPage = 10;

    useEffect(() => {
        const loadCustomersData = async () => {
            setLoading(true);
            const customers = getCustomers();
            const orders = await getOrders();

            const enriched = customers.map((customer) => {
                const customerOrders = orders.filter((o) => o.customerId === customer.id);
                const totalSpent = customerOrders
                    .filter((o) => o.status === "Completed")
                    .reduce((sum, o) => sum + o.total, 0);

                return {
                    ...customer,
                    totalOrders: customerOrders.length,
                    totalSpent,
                };
            });

            setCustomersList(enriched);
            setLoading(false);
        };

        loadCustomersData();
    }, []);

    const filteredCustomers = useMemo(() => {
        let result = [...customersList];
        if (search) {
            const query = search.toLowerCase();
            result = result.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(query) ||
                    customer.email.toLowerCase().includes(query) ||
                    (customer.phone && customer.phone.includes(query))
            );
        }
        return result;
    }, [customersList, search]);

    const totalPages = Math.ceil(filteredCustomers.length / perPage);
    const currentCustomers = filteredCustomers.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    return (
        <div className="space-y-8">
            <CustomerHeader />
            <CustomerFilter search={search} onSearchChange={setSearch} />

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#145A3B] mx-auto"></div>
                    <p className="text-gray-500 mt-4 font-semibold">Loading customers...</p>
                </div>
            ) : filteredCustomers.length === 0 ? (
                <EmptyState
                    title="No Customers Found"
                    description="Coba ubah kata kunci pencarian Anda."
                />
            ) : (
                <>
                    <CustomerTable customers={currentCustomers} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
}
