"use client";

import { useEffect, useState } from "react";

import ProductHeader from "@/components/dashboard/products/productHeader";
import ProductFilter from "@/components/dashboard/products/productFilter";
import ProductTable from "@/components/dashboard/products/productTable";

import { getProducts } from "@/services/productService";
import { getCategories } from "@/services/categoryService";

export default function ProductsPage() {

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [status, setStatus] = useState("");

    const [sort, setSort] = useState("latest");

    const [products, setProducts] = useState<any[]>([]);

    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        getProducts().then((response: any) => {
            const rawData = response?.data;
            const data = Array.isArray(rawData)
                ? rawData
                : Array.isArray(rawData?.products)
                    ? rawData.products
                    : [];
            setProducts(data);
        });

        const categoriesResponse = getCategories();
        setCategories(categoriesResponse);
    }, []);

    return (

        <>

            <ProductHeader />

            <ProductFilter

                search={search}

                onSearchChange={setSearch}

                category={category}

                onCategoryChange={setCategory}

                status={status}

                onStatusChange={setStatus}

                sort={sort}

                onSortChange={setSort}

                categories={

                    categories.map(

                        item => item.name

                    )

                }

            />

            <ProductTable

                products={products}

                onDelete={(id)=>{

                    console.log(id);

                }}

            />

        </>

    );

}