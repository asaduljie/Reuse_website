"use client";

import { useRouter } from "next/navigation";
import SellerHeader from "@/components/dashboard/sellers/SellerHeader";
import SellerForm, { SellerFormData } from "@/components/dashboard/sellers/SellerForm";
import { addSellerProfile, getSellerProfiles } from "@/services/sellerService";

export default function CreateSellerPage() {
    const router = useRouter();

    function handleCreate(data: SellerFormData) {
        const profiles = getSellerProfiles();
        const newId = profiles.length > 0 ? Math.max(...profiles.map(p => p.id)) + 1 : 1;

        addSellerProfile({
            id: newId,
            userId: data.userId,
            storeName: data.storeName,
            description: data.description,
            logo: data.logo,
            banner: data.banner || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200",
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
            rating: 5.0, 
            totalSales: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            verifiedDate: data.verified ? new Date().toISOString() : undefined,
            verifiedBy: data.verified ? "Admin" : undefined,
            verificationNotes: data.verificationNotes,
        });

        router.push("/dashboard/admin/sellers");
    }

    return (
        <>
            <SellerHeader
                title="Create Seller Store"
                description="Tambah profil toko seller baru ke marketplace."
                buttonText="Back"
                addUrl="/dashboard/admin/sellers"
            />
            <SellerForm onSubmit={handleCreate} submitLabel="Create Store Profile" />
        </>
    );
}
