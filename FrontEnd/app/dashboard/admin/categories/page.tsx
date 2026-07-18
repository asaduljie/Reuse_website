"use client";

import { useMemo, useState } from "react";

import CategoryHeader from "@/components/dashboard/categories/CategoryHeader";
import CategoryFilter from "@/components/dashboard/categories/CategoryFilter";
import CategoryTable from "@/components/dashboard/categories/CategoryTable";

import Pagination from "@/components/dashboard/common/Pagination";
import ConfirmDeleteModal from "@/components/dashboard/common/confirmdeleteModal";

import {
    getCategories,
    deleteCategory,
} from "@/services/categoryService";

export default function CategoriesPage() {

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const perPage = 10;

    const categories = getCategories();

    const filteredCategories = useMemo(() => {

        let result = [...categories];

        if (search) {

            result = result.filter(category =>

                category.name

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    )

            );

        }

        if (status) {

            result = result.filter(

                category =>

                    category.status === status

            );

        }

        return result;

    }, [

        categories,

        search,

        status,

    ]);

    const totalPages = Math.ceil(

        filteredCategories.length /

        perPage

    );

    const currentCategories =

        filteredCategories.slice(

            (currentPage - 1) * perPage,

            currentPage * perPage

        );

    function handleDelete(id: number) {

        setSelectedId(id);

        setDeleteOpen(true);

    }

    function confirmDelete() {

        if (selectedId === null) {

            return;

        }

        deleteCategory(selectedId);

        setDeleteOpen(false);

        setSelectedId(null);

        window.location.reload();

    }

    return (

        <div className="space-y-8">

            <CategoryHeader />

            <CategoryFilter

                search={search}

                onSearchChange={setSearch}

                status={status}

                onStatusChange={setStatus}

            />

            <CategoryTable

                categories={currentCategories}

                onDelete={handleDelete}

            />

            <Pagination

                currentPage={currentPage}

                totalPages={totalPages}

                onPageChange={setCurrentPage}

            />

            <ConfirmDeleteModal

                open={deleteOpen}

                title="Delete Category"

                message="This category will be permanently deleted."

                onClose={() => {

                    setDeleteOpen(false);

                    setSelectedId(null);

                }}

                onConfirm={confirmDelete}

            />

        </div>

    );

}
