"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductHeader from "@/components/dashboard/products/productHeader";
import ProductForm, {
    ProductFormData,
} from "@/components/dashboard/products/productForm";

import {
    getCategories,
} from "@/services/categoryService";

import {
    getProducts,
    updateProduct,
} from "@/services/productService";

interface Props {

    params: Promise<{

        id: string;

    }>;

}

export default function EditProductPage({

    params,

}: Props) {

    const router = useRouter();
    const resolvedParams = use(params);

    const [product, setProduct] = useState<any | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const productsResponse = await getProducts();
            const categoriesResponse = await getCategories();

            const rawData = productsResponse?.data;
            const productsData = Array.isArray(rawData)
                ? rawData
                : Array.isArray(rawData?.products)
                    ? rawData.products
                    : [];

            const foundProduct = productsData.find(
                (p: any) => p.id === Number(resolvedParams.id)
            );

            const mappedProduct = foundProduct ? {
                ...foundProduct,
                image: foundProduct.imageUrl || foundProduct.image || ""
            } : null;

            setProduct(mappedProduct);
            setCategories(
                categoriesResponse.map((item: any) => item.name)
            );
            setLoading(false);
        }

        fetchData();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                Product not found.
            </div>
        );
    }

    async function handleUpdate(

        data: ProductFormData

    ) {

        await updateProduct(

            product.id,

            data

        );

        router.push(

            "/dashboard/admin/products"

        );

    }

    return (

        <>

            <ProductHeader

                title="Edit Product"

                description="Perbarui informasi produk."

                buttonText="Back"

                addUrl="/dashboard/admin/products"

            />

            <ProductForm

                initialData={product}

                categories={categories}

                submitLabel="Update Product"

                onSubmit={handleUpdate}

            />

        </>

    );

}