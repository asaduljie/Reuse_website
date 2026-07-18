"use client";

import { useMemo, useState, useEffect } from "react";

import ProductHeader from "@/components/dashboard/products/productHeader";
import ProductFilter from "@/components/dashboard/products/productFilter";
import ProductTable from "@/components/dashboard/products/productTable";
import ConfirmDeleteModal from "@/components/dashboard/common/confirmdeleteModal";
import Pagination from "@/components/dashboard/common/Pagination";

import {
    getProducts,
    deleteProduct,
} from "@/services/productService";

import {
    getCategories,
} from "@/services/categoryService";

type Product = {
    id: number;
    name: string;
    category: string;
    status: "active" | "inactive";
    price: number;
    stock: number;
    image: string;
};

type Category = {
    name: string;
};

export default function ProductsPage() {

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [status, setStatus] = useState("");

    const [sort, setSort] = useState("latest");

    const [products, setProducts] = useState<Product[]>([]);

    const [categories, setCategories] = useState<Category[]>([]);

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await getProducts();
                const payload = response?.data ?? response;
                const data = Array.isArray(payload)
                    ? payload
                    : Array.isArray(payload?.products)
                        ? payload.products
                        : Array.isArray(payload?.data)
                            ? payload.data
                            : [];

                setProducts(data as Product[]);
            } catch {
                setProducts([]);
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        const result = getCategories();

        if (Array.isArray(result)) {
            setCategories(result);
        }
    }, []);

    const filteredProducts = useMemo(() => {

        const safeProducts = Array.isArray(products) ? products : [];
        let result = [...safeProducts];

        if (search) {

            result = result.filter(product =>

                product.name

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    )

            );

        }

        if (category) {

            result = result.filter(

                product =>

                    product.category === category

            );

        }

        if (status) {

            result = result.filter(

                product =>

                    product.status === status

            );

        }

        switch (sort) {

            case "price_asc":

                result.sort(

                    (a,b)=>

                    a.price-b.price

                );

                break;

            case "price_desc":

                result.sort(

                    (a,b)=>

                    b.price-a.price

                );

                break;

            case "stock":

                result.sort(

                    (a,b)=>

                    b.stock-a.stock

                );

                break;

            default:

                break;

        }

        return result;

    }, [

        products,

        search,

        category,

        status,

        sort,

    ]);

    const totalPages = Math.ceil(
        filteredProducts.length / perPage
    );

    const currentProducts =
        filteredProducts.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
        );

    function handleDelete(

        id:number

    ){

        setSelectedId(id);
        setDeleteOpen(true);

    }

    function confirmDelete() {
        if (selectedId === null) {
            return;
        }

        deleteProduct(selectedId);
        setDeleteOpen(false);
        setSelectedId(null);
        window.location.reload();
    }

    return (

        <div className="space-y-8">

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

                        item=>item.name

                    )

                }

            />

            <ProductTable

                products={currentProducts}

                onDelete={handleDelete}

            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <ConfirmDeleteModal
                open={deleteOpen}
                title="Delete Product"
                message="This product will be permanently deleted."
                onClose={() => {
                    setDeleteOpen(false);
                    setSelectedId(null);
                }}
                onConfirm={confirmDelete}
            />

        </div>

    );

}