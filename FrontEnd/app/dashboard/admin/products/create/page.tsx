"use client";

import { useRouter } from "next/navigation";

import ProductHeader from "@/components/dashboard/products/productHeader";
import ProductForm, {
    ProductFormData,
} from "@/components/dashboard/products/productForm";

import {
    getCategories,
} from "@/services/categoryService";

import {
    Product,
    getProducts,
    createProduct,
} from "@/services/productService";

export default function CreateProductPage() {

    const router = useRouter();

    const categories = getCategories();

    async function handleCreate(
        data: ProductFormData
    ) {

        await createProduct(data);

        router.push(
            "/dashboard/admin/products"
        );

    }

    return (

        <>

            <ProductHeader

                title="Create Product"

                description="Tambah produk baru ke marketplace."

                buttonText="Back"

                addUrl="/dashboard/admin/products"

            />

            <ProductForm

                categories={

                    categories.map(

                        category => category.name

                    )

                }

                onSubmit={handleCreate}

            />

        </>

    );

}