"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BannerHeader from "@/components/dashboard/banners/BannerHeader";
import BannerForm, { BannerFormData } from "@/components/dashboard/banners/BannerForm";
import BannerPreview from "@/components/dashboard/banners/BannerPreview";
import { addBanner, getBanners } from "@/services/bannerService";

export default function CreateBannerPage() {
    const router = useRouter();
    const [previewData, setPreviewData] = useState<BannerFormData>({
        title: "",
        subtitle: "",
        description: "",
        image: "",
        buttonText: "",
        buttonLink: "",
        position: "Hero",
        priority: 1,
        startDate: "",
        endDate: "",
        status: "Draft",
    });

    function handleCreate(data: BannerFormData) {
        const banners = getBanners();
        const newId = banners.length > 0 ? Math.max(...banners.map((b) => b.id)) + 1 : 1;

        addBanner({
            id: newId,
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        router.push("/dashboard/admin/banners");
    }

    return (
        <div className="space-y-8">
            <BannerHeader
                title="Create Homepage Banner"
                description="Tambah banner promosi baru untuk dipasang di homepage ReUse."
                buttonText="Back"
                addUrl="/dashboard/admin/banners"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Form */}
                <div className="lg:col-span-2">
                    <BannerForm
                        onSubmit={handleCreate}
                        onFormChange={setPreviewData}
                        submitLabel="Create Banner Profile"
                    />
                </div>

                {/* Right Realtime Preview Panel */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Realtime Banner Preview</h3>
                        <BannerPreview
                            title={previewData.title}
                            subtitle={previewData.subtitle}
                            description={previewData.description}
                            image={previewData.image}
                            buttonText={previewData.buttonText}
                            position={previewData.position}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
