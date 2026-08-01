"use client";

import { useRouter } from "next/navigation";
import ProductForm, { ProductFormData } from "@/components/dashboard/products/productForm";
import ProductHeader from "@/components/dashboard/products/productHeader";
import { getCategories } from "@/services/categoryService";
import { createProduct } from "@/services/productService";
import { getUser } from "@/utils/auth";
import { getSellerByUserId } from "@/services/sellerService";

export default function NewSellerProductPage() {
  const router = useRouter();
  const categories = getCategories().map((c) => c.name);

  const handleSubmit = async (data: ProductFormData) => {
    const user = getUser();
    const seller = user ? getSellerByUserId(Number(user.id)) : undefined;

    await createProduct({
      ...data,
      sellerId: seller?.id,
      seller_id: seller?.id,
    });

    router.push("/dashboard/seller/products");
  };

  return (
    <div className="space-y-6">
      <ProductHeader
        title="Tambah Produk Baru"
        description="Unggah produk preloved Anda dengan mudah (bisa Drag & Drop atau Paste Ctrl+V gambar)."
        addUrl="/dashboard/seller/products"
        buttonText="Kembali"
      />
      <ProductForm categories={categories} onSubmit={handleSubmit} submitLabel="Simpan Produk" />
    </div>
  );
}
