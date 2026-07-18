"use client";

import { useRouter } from "next/navigation";

import CategoryHeader from "@/components/dashboard/categories/CategoryHeader";

import CategoryForm, {
    CategoryFormData,
} from "@/components/dashboard/categories/CategoryForm";

import {
    addCategory,
    getCategories,
} from "@/services/categoryService";

export default function CreateCategoryPage() {

    const router = useRouter();

    function handleCreate(

        data: CategoryFormData

    ) {

        const categories = getCategories();

        addCategory({

            id: categories.length + 1,

            totalProducts: 0,

            ...data,

        });

        router.push(

            "/dashboard/admin/categories"

        );

    }

    return (

        <>

            <CategoryHeader

                title="Create Category"

                description="Tambah kategori baru."

                buttonText="Back"

                addUrl="/dashboard/admin/categories"

            />

            <CategoryForm

                onSubmit={handleCreate}

            />

        </>

    );

}
