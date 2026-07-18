"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import CategoryHeader from "@/components/dashboard/categories/CategoryHeader";

import CategoryForm,{
    CategoryFormData,
} from "@/components/dashboard/categories/CategoryForm";

import {
    getCategory,
    updateCategory,
} from "@/services/categoryService";

interface Props{

    params: Promise<{

        id:string;

    }>;

}

export default function EditCategoryPage({

    params,

}:Props){

    const router=useRouter();

    const resolvedParams = use(params);

    const category=getCategory(

        Number(resolvedParams.id)

    );

    if(!category){

        return(

            <div>

                Category not found.

            </div>

        );

    }

    const handleUpdate = (

        data:CategoryFormData

    ) => {

        updateCategory(

            category.id,

            data

        );

        router.push(

            "/dashboard/admin/categories"

        );

    };

    return(

        <>

            <CategoryHeader

                title="Edit Category"

                description="Perbarui kategori."

                buttonText="Back"

                addUrl="/dashboard/admin/categories"

            />

            <CategoryForm

                initialData={category}

                submitLabel="Update Category"

                onSubmit={handleUpdate}

            />

        </>

    );

}
