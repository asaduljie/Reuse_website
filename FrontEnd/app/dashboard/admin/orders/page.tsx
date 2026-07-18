"use client";

import { useEffect, useMemo, useState } from "react";

import OrderHeader from "@/components/dashboard/orders/OrderHeader";
import OrderFilter from "@/components/dashboard/orders/OrderFilter";
import OrderTable from "@/components/dashboard/orders/OrderTable";

import Pagination from "@/components/dashboard/common/Pagination";
import ConfirmDeleteModal from "@/components/dashboard/common/confirmdeleteModal";

import {
    getOrders,
    deleteOrder,
} from "@/services/orderService";

export default function OrdersPage() {

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const perPage = 10;

    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const loadOrders = async () => {
            const data = await getOrders();
            setOrders(data);
        };
        loadOrders();
    }, []);

    const filteredOrders = useMemo(() => {

        let result = [...orders];

        if (search) {

            result = result.filter(order =>

                order.customerName

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    )

            );

        }

        if (status) {

            result = result.filter(

                order =>

                    order.status === status

            );

        }

        return result;

    }, [

        orders,

        search,

        status,

    ]);

    const totalPages = Math.ceil(

        filteredOrders.length / perPage

    );

    const currentOrders = filteredOrders.slice(

        (currentPage - 1) * perPage,

        currentPage * perPage

    );

    function handleDelete(id:number){

        setSelectedId(id);

        setDeleteOpen(true);

    }

    async function confirmDelete(){

        if(selectedId===null){

            return;

        }

        await deleteOrder(selectedId);

        setDeleteOpen(false);

        setSelectedId(null);

        window.location.reload();

    }

    return(

        <div className="space-y-8">

            <OrderHeader
                totalOrders={orders.length}
                onRefresh={() => window.location.reload()}
            />

            <OrderFilter

                search={search}

                status={status}

                onSearchChange={setSearch}

                onStatusChange={setStatus}

            />

            <OrderTable

                orders={currentOrders}

                onDelete={handleDelete}

            />

            <Pagination

                currentPage={currentPage}

                totalPages={totalPages}

                onPageChange={setCurrentPage}

            />

            <ConfirmDeleteModal

                open={deleteOpen}

                title="Delete Order"

                message="This order will be permanently deleted."

                onClose={() => {

                    setDeleteOpen(false);

                    setSelectedId(null);

                }}

                onConfirm={confirmDelete}

            />

        </div>

    );

}
