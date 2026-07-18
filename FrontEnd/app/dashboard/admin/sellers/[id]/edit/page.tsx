"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import SellerHeader from "@/components/dashboard/sellers/SellerHeader";
import SellerForm, { SellerFormData } from "@/components/dashboard/sellers/SellerForm";
import { getSellerProfile, updateSellerProfile } from "@/services/sellerService";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function EditSellerPage({ params }: Props) {
    const router = useRouter();
    const resolvedParams = use(params);
    const id = Number(resolvedParams.id);
    const seller = getSellerProfile(id);

    if (!seller) {
        return (
            <div className="bg-white rounded-[30px] shadow-sm p-8 text-center border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-700">Store Profile Not Found</h2>
                <p className="text-gray-500 mt-2">Toko seller yang ingin Anda edit tidak ditemukan.</p>
            </div>
        );
    }

    function handleUpdate(data: SellerFormData) {
        updateSellerProfile(id, {
            storeName: data.storeName,
            description: data.description,
            logo: data.logo,
            banner: data.banner,
            phone: data.phone,
            address: data.address,
            city: data.city,
            province: data.province,
            postalCode: data.postalCode,
            bankName: data.bankName,
            bankAccountName: data.bankAccountName,
            bankAccountNumber: data.bankAccountNumber,
            verified: data.verified,
            status: data.status,
            verificationNotes: data.verificationNotes,
            verifiedDate: data.verified && !seller!.verified ? new Date().toISOString() : seller!.verifiedDate,
            verifiedBy: data.verified && !seller!.verified ? "Admin" : seller!.verifiedBy,
        });

        router.push("/dashboard/admin/sellers");
    }

    return (
        <>
            <SellerHeader
                title="Edit Store Profile"
                description="Perbarui informasi toko seller."
                buttonText="Back"
                addUrl="/dashboard/admin/sellers"
            />
            <SellerForm
                initialData={seller}
                onSubmit={handleUpdate}
                submitLabel="Update Store Profile"
            />
        </>
    );
}
