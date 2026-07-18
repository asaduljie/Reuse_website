"use client";

import { useState, useEffect } from "react";
import { getSellers, User } from "../../../services/userService";

export interface SellerFormData {
    userId: number;
    storeName: string;
    description: string;
    logo: string;
    banner: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    bankName: string;
    bankAccountName: string;
    bankAccountNumber: string;
    verified: boolean;
    status: "active" | "inactive" | "blocked";
    verificationNotes: string;
}

interface Props {
    initialData?: Partial<SellerFormData>;
    submitLabel?: string;
    onSubmit: (data: SellerFormData) => void;
}

export default function SellerForm({
    initialData,
    submitLabel = "Save Seller",
    onSubmit,
}: Props) {
    const [sellerUsers, setSellerUsers] = useState<User[]>([]);
    const [form, setForm] = useState<SellerFormData>({
        userId: initialData?.userId ?? 0,
        storeName: initialData?.storeName ?? "",
        description: initialData?.description ?? "",
        logo: initialData?.logo ?? "",
        banner: initialData?.banner ?? "",
        phone: initialData?.phone ?? "",
        address: initialData?.address ?? "",
        city: initialData?.city ?? "",
        province: initialData?.province ?? "",
        postalCode: initialData?.postalCode ?? "",
        bankName: initialData?.bankName ?? "",
        bankAccountName: initialData?.bankAccountName ?? "",
        bankAccountNumber: initialData?.bankAccountNumber ?? "",
        verified: initialData?.verified ?? false,
        status: initialData?.status ?? "active",
        verificationNotes: initialData?.verificationNotes ?? "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        // Fetch all user accounts that have the 'seller' role
        const users = getSellers();
        setSellerUsers(users);
        if (!initialData && users.length > 0 && form.userId === 0) {
            setForm((f) => ({ ...f, userId: users[0].id }));
        }
    }, [initialData]);

    function handleChange(key: keyof SellerFormData, value: any) {
        setForm({
            ...form,
            [key]: value,
        });
        if (errors[key]) {
            setErrors({
                ...errors,
                [key]: "",
            });
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!form.storeName.trim()) {
            newErrors.storeName = "Store Name is required.";
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required.";
        }

        if (!form.logo.trim()) {
            newErrors.logo = "Logo URL/Path is required.";
        }

        if (!form.address.trim()) {
            newErrors.address = "Address is required.";
        }

        if (!initialData && form.userId === 0) {
            newErrors.userId = "Owner User is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit(form);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[30px] shadow-sm p-8 md:p-10 space-y-6"
        >
            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Store Identity</h2>

            {/* Owner User (Dropdown when creating, disabled when editing) */}
            <div>
                <label className="font-semibold text-gray-700 block">Owner User Profile (Role: Seller)</label>
                {initialData ? (
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl mt-2 px-4 py-3.5 text-gray-500 font-medium">
                        {sellerUsers.find((u) => u.id === form.userId)?.name || "Store Owner"} (ID: #{form.userId})
                    </div>
                ) : (
                    <select
                        value={form.userId}
                        onChange={(e) => handleChange("userId", Number(e.target.value))}
                        className={`w-full border bg-white rounded-2xl mt-2 px-4 py-3.5 focus:outline-none transition ${
                            errors.userId ? "border-red-500" : "border-gray-200 focus:border-[#145A3B]"
                        }`}
                    >
                        <option value={0}>Select a seller user...</option>
                        {sellerUsers.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name} ({u.email})
                            </option>
                        ))}
                    </select>
                )}
                {errors.userId && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.userId}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="font-semibold text-gray-700 block">Store Name</label>
                    <input
                        value={form.storeName}
                        onChange={(e) => handleChange("storeName", e.target.value)}
                        placeholder="Enter store name"
                        className={`w-full border rounded-2xl mt-2 px-4 py-3.5 focus:outline-none transition ${
                            errors.storeName ? "border-red-500" : "border-gray-200 focus:border-[#145A3B]"
                        }`}
                    />
                    {errors.storeName && (
                        <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.storeName}</p>
                    )}
                </div>

                <div>
                    <label className="font-semibold text-gray-700 block">Store Phone Number</label>
                    <input
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Enter phone number"
                        className={`w-full border rounded-2xl mt-2 px-4 py-3.5 focus:outline-none transition ${
                            errors.phone ? "border-red-500" : "border-gray-200 focus:border-[#145A3B]"
                        }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.phone}</p>}
                </div>
            </div>

            <div>
                <label className="font-semibold text-gray-700 block">Store Description</label>
                <textarea
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Enter store description"
                    rows={3}
                    className="w-full border border-gray-200 rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="font-semibold text-gray-700 block">Logo URL / Path</label>
                    <input
                        value={form.logo}
                        onChange={(e) => handleChange("logo", e.target.value)}
                        placeholder="e.g. /images/sellers/reuse-logo.png"
                        className={`w-full border rounded-2xl mt-2 px-4 py-3.5 focus:outline-none transition ${
                            errors.logo ? "border-red-500" : "border-gray-200 focus:border-[#145A3B]"
                        }`}
                    />
                    {errors.logo && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.logo}</p>}
                </div>

                <div>
                    <label className="font-semibold text-gray-700 block">Banner URL / Path</label>
                    <input
                        value={form.banner}
                        onChange={(e) => handleChange("banner", e.target.value)}
                        placeholder="e.g. /images/sellers/reuse-banner.jpg"
                        className="w-full border border-gray-200 rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                    />
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 pt-4">Location & Address</h2>

            <div>
                <label className="font-semibold text-gray-700 block">Full Address</label>
                <input
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Enter full address"
                    className={`w-full border rounded-2xl mt-2 px-4 py-3.5 focus:outline-none transition ${
                        errors.address ? "border-red-500" : "border-gray-200 focus:border-[#145A3B]"
                    }`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.address}</p>}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <label className="font-semibold text-gray-700 block">City</label>
                    <input
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="City"
                        className="w-full border border-gray-200 rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                    />
                </div>

                <div>
                    <label className="font-semibold text-gray-700 block">Province</label>
                    <input
                        value={form.province}
                        onChange={(e) => handleChange("province", e.target.value)}
                        placeholder="Province"
                        className="w-full border border-gray-200 rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                    />
                </div>

                <div>
                    <label className="font-semibold text-gray-700 block">Postal Code</label>
                    <input
                        value={form.postalCode}
                        onChange={(e) => handleChange("postalCode", e.target.value)}
                        placeholder="Postal Code"
                        className="w-full border border-gray-200 rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                    />
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 pt-4">Bank Account & Payouts</h2>

            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <label className="font-semibold text-gray-700 block">Bank Name</label>
                    <input
                        value={form.bankName}
                        onChange={(e) => handleChange("bankName", e.target.value)}
                        placeholder="e.g. BCA, Mandiri, BRI"
                        className="w-full border border-gray-200 rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                    />
                </div>

                <div>
                    <label className="font-semibold text-gray-700 block">Account Holder Name</label>
                    <input
                        value={form.bankAccountName}
                        onChange={(e) => handleChange("bankAccountName", e.target.value)}
                        placeholder="Bank Account Name"
                        className="w-full border border-gray-200 rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                    />
                </div>

                <div>
                    <label className="font-semibold text-gray-700 block">Account Number</label>
                    <input
                        value={form.bankAccountNumber}
                        onChange={(e) => handleChange("bankAccountNumber", e.target.value)}
                        placeholder="Bank Account Number"
                        className="w-full border border-gray-200 rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                    />
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 pt-4">Verification & Account Status</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="font-semibold text-gray-700 block">Account Status</label>
                    <select
                        value={form.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                        className="w-full border bg-white rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>

                <div>
                    <label className="font-semibold text-gray-700 block">Verification Status</label>
                    <select
                        value={form.verified ? "verified" : "unverified"}
                        onChange={(e) => handleChange("verified", e.target.value === "verified")}
                        className="w-full border bg-white rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                    >
                        <option value="unverified">Not Verified</option>
                        <option value="verified">Verified</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="font-semibold text-gray-700 block">Verification Notes</label>
                <textarea
                    value={form.verificationNotes}
                    onChange={(e) => handleChange("verificationNotes", e.target.value)}
                    placeholder="Enter notes regarding store verification (e.g. document validation status, approvals)"
                    rows={2}
                    className="w-full border border-gray-200 rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                />
            </div>

            <div className="pt-4">
                <button className="w-full md:w-auto bg-[#145A3B] hover:bg-[#0F472E] text-white px-8 py-4 rounded-2xl font-semibold transition shadow-sm">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
