"use client";

import { useEffect, useState } from "react";
import { Banner } from "../../../services/bannerService";

export interface BannerFormData {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    buttonText: string;
    buttonLink: string;
    position: "Hero" | "Homepage Promo" | "Flash Sale" | "Category Banner" | "Footer Banner";
    priority: number;
    startDate: string;
    endDate: string;
    status: "Draft" | "Published" | "Expired" | "Hidden";
}

interface Props {
    initialData?: Banner;
    onSubmit: (data: BannerFormData) => void;
    onFormChange?: (data: BannerFormData) => void;
    submitLabel?: string;
}

export default function BannerForm({
    initialData,
    onSubmit,
    onFormChange,
    submitLabel = "Save Banner",
}: Props) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [image, setImage] = useState(initialData?.image || "");
    const [buttonText, setButtonText] = useState(initialData?.buttonText || "");
    const [buttonLink, setButtonLink] = useState(initialData?.buttonLink || "");
    const [position, setPosition] = useState<BannerFormData["position"]>(initialData?.position || "Hero");
    const [priority, setPriority] = useState(initialData?.priority || 1);
    const [startDate, setStartDate] = useState(initialData?.startDate || "");
    const [endDate, setEndDate] = useState(initialData?.endDate || "");
    const [status, setStatus] = useState<BannerFormData["status"]>(initialData?.status || "Draft");

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const formData: BannerFormData = {
        title,
        subtitle,
        description,
        image,
        buttonText,
        buttonLink,
        position,
        priority,
        startDate,
        endDate,
        status,
    };

    useEffect(() => {
        if (onFormChange) {
            onFormChange(formData);
        }
    }, [title, subtitle, description, image, buttonText, buttonLink, position, priority, startDate, endDate, status]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs: { [key: string]: string } = {};

        if (!title.trim()) errs.title = "Title is required.";
        if (!image.trim()) errs.image = "Image URL is required.";
        if (!buttonText.trim()) errs.buttonText = "Button text is required.";
        if (!buttonLink.trim()) errs.buttonLink = "Button link is required.";
        if (!startDate) errs.startDate = "Start Date is required.";
        if (!endDate) errs.endDate = "End Date is required.";

        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-[30px] shadow-sm p-8 md:p-10 border border-gray-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Banner Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Summer Sale 2026"
                        className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
                        required
                    />
                    {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title}</p>}
                </div>

                {/* Subtitle */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Banner Subtitle</label>
                    <input
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="e.g. Diskon sampai 50%"
                        className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
                    />
                </div>

                {/* Image URL */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Banner Image URL</label>
                    <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="e.g. /images/hero1.jpg"
                        className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
                        required
                    />
                    {errors.image && <p className="text-xs text-red-500 font-medium">{errors.image}</p>}
                </div>

                {/* Position */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Position</label>
                    <select
                        value={position}
                        onChange={(e) => setPosition(e.target.value as BannerFormData["position"])}
                        className="w-full border rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
                    >
                        <option value="Hero">Hero Banner</option>
                        <option value="Homepage Promo">Homepage Promo</option>
                        <option value="Flash Sale">Flash Sale</option>
                        <option value="Category Banner">Category Banner</option>
                        <option value="Footer Banner">Footer Banner</option>
                    </select>
                </div>

                {/* Button Text */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Button Text</label>
                    <input
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        placeholder="e.g. Belanja Sekarang"
                        className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
                        required
                    />
                    {errors.buttonText && <p className="text-xs text-red-500 font-medium">{errors.buttonText}</p>}
                </div>

                {/* Button Link */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Button Link</label>
                    <input
                        value={buttonLink}
                        onChange={(e) => setButtonLink(e.target.value)}
                        placeholder="e.g. /products"
                        className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
                        required
                    />
                    {errors.buttonLink && <p className="text-xs text-red-500 font-medium">{errors.buttonLink}</p>}
                </div>

                {/* Priority */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Priority (Urutan)</label>
                    <input
                        type="number"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
                        required
                    />
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as BannerFormData["status"])}
                        className="w-full border rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
                    >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Expired">Expired</option>
                        <option value="Hidden">Hidden</option>
                    </select>
                </div>

                {/* Start Date */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
                        required
                    />
                    {errors.startDate && <p className="text-xs text-red-500 font-medium">{errors.startDate}</p>}
                </div>

                {/* End Date */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
                        required
                    />
                    {errors.endDate && <p className="text-xs text-red-500 font-medium">{errors.endDate}</p>}
                </div>

                {/* Description */}
                <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Banner Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detail tambahan banner..."
                        rows={3}
                        className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 leading-relaxed font-semibold"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
                <button
                    type="submit"
                    className="bg-[#145A3B] hover:bg-[#0F472E] text-white px-6 py-3.5 rounded-xl font-bold transition shadow-sm"
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
