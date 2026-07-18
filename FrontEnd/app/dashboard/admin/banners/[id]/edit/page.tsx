"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import BannerHeader from "@/components/dashboard/banners/BannerHeader";
import BannerForm, { BannerFormData } from "@/components/dashboard/banners/BannerForm";
import BannerPreview from "@/components/dashboard/banners/BannerPreview";
import { getBanner, updateBanner } from "@/services/bannerService";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function EditBannerPage({ params }: Props) {
    const router = useRouter();
    const resolvedParams = use(params);
    const id = Number(resolvedParams.id);
    const banner = getBanner(id);

    const [previewData, setPreviewData] = useState<BannerFormData>({
        title: banner?.title || "",
        subtitle: banner?.subtitle || "",
        description: banner?.description || "",
        image: banner?.image || "",
        buttonText: banner?.buttonText || "",
        buttonLink: banner?.buttonLink || "",
        position: banner?.position || "Hero",
        priority: banner?.priority || 1,
        startDate: banner?.startDate || "",
        endDate: banner?.endDate || "",
        status: banner?.status || "Draft",
    });

    if (!banner) {
        return (
            <div className="bg-white rounded-[30px] shadow-sm p-8 text-center border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-700">Banner Profile Not Found</h2>
                <p className="text-gray-500 mt-2">Banner promosi yang ingin Anda edit tidak ditemukan.</p>
            </div>
        );
    }

    function handleUpdate(data: BannerFormData) {
        updateBanner(id, data);
        router.push("/dashboard/admin/banners");
    }

    return (
        <div className="space-y-8">
            <BannerHeader
                title="Edit Homepage Banner"
                description="Perbarui pengaturan banner promosi."
                buttonText="Back"
                addUrl="/dashboard/admin/banners"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Form */}
                <div className="lg:col-span-2">
                    <BannerForm
                        initialData={banner}
                        onSubmit={handleUpdate}
                        onFormChange={setPreviewData}
                        submitLabel="Update Banner Profile"
                    />
                </div>

                {/* Right Preview Panel */}
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
