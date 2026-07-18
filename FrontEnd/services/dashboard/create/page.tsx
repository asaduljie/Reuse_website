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
} from "@/services/productService";

export default function CreateProductPage() {

    const router = useRouter();

    const categories = getCategories();

    async function handleCreate(
        data: ProductFormData
    ) {

        // getProducts returns a Promise/axios response, await and read data
        const resp = await getProducts();
        const rawData = (resp as any)?.data ?? resp;
        const products: Product[] = Array.isArray(rawData)
            ? rawData
            : Array.isArray(rawData?.products)
                ? rawData.products
                : [];

        const newProduct: Product = {
            id: (products.length ?? 0) + 1,
            ...data,
            // map form image to product imageUrl and set creation timestamp
            imageUrl: (data as any).image ?? "",
            created_at: new Date().toISOString(),
        };

        products.push(newProduct);

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