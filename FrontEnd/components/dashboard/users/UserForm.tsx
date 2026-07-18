"use client";

import { useState } from "react";
import { getUsers } from "../../../services/userService";

export interface UserFormData {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role:
        | "super_admin"
        | "admin"
        | "seller"
        | "customer";
    status:
        | "active"
        | "inactive"
        | "blocked";
}

interface Props {
    initialData?: UserFormData;
    submitLabel?: string;
    onSubmit: (data: UserFormData) => void;
}

export default function UserForm({
    initialData,
    submitLabel = "Save User",
    onSubmit,
}: Props) {
    const [form, setForm] = useState<UserFormData>(
        initialData ?? {
            name: "",
            email: "",
            phone: "",
            avatar: "",
            role: "customer",
            status: "active",
        }
    );

    const [errors, setErrors] = useState<Record<string, string>>({});

    function handleChange(
        key: keyof UserFormData,
        value: string
    ) {
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

        if (!form.name.trim()) {
            newErrors.name = "Full name is required.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email format.";
        } else {
            // Check email uniqueness
            const allUsers = getUsers();
            const emailExists = allUsers.some(
                (user) =>
                    user.email.toLowerCase() === form.email.toLowerCase() &&
                    (!initialData || user.email.toLowerCase() !== initialData.email.toLowerCase())
            );
            if (emailExists) {
                newErrors.email = "Email must be unique. This email is already registered.";
            }
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required.";
        }

        if (!form.role) {
            newErrors.role = "Role is required.";
        }

        if (!form.status) {
            newErrors.status = "Status is required.";
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
            <div>
                <label className="font-semibold text-gray-700 block">
                    Full Name
                </label>
                <input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter full name"
                    className={`w-full border rounded-2xl mt-2 px-4 py-3.5 focus:outline-none transition ${
                        errors.name
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-[#145A3B]"
                    }`}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1.5 font-medium">
                        {errors.name}
                    </p>
                )}
            </div>

            <div>
                <label className="font-semibold text-gray-700 block">
                    Email Address
                </label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className={`w-full border rounded-2xl mt-2 px-4 py-3.5 focus:outline-none transition ${
                        errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-[#145A3B]"
                    }`}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1.5 font-medium">
                        {errors.email}
                    </p>
                )}
            </div>

            <div>
                <label className="font-semibold text-gray-700 block">
                    Phone Number
                </label>
                <input
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className={`w-full border rounded-2xl mt-2 px-4 py-3.5 focus:outline-none transition ${
                        errors.phone
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-[#145A3B]"
                    }`}
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1.5 font-medium">
                        {errors.phone}
                    </p>
                )}
            </div>

            <div>
                <label className="font-semibold text-gray-700 block">
                    Avatar URL
                </label>
                <input
                    value={form.avatar}
                    onChange={(e) => handleChange("avatar", e.target.value)}
                    placeholder="Enter avatar URL (optional)"
                    className="w-full border border-gray-200 rounded-2xl mt-2 px-4 py-3.5 focus:outline-none focus:border-[#145A3B] transition"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="font-semibold text-gray-700 block">
                        Role
                    </label>
                    <select
                        value={form.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                        className={`w-full border bg-white rounded-2xl mt-2 px-4 py-3.5 focus:outline-none transition ${
                            errors.role
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 focus:border-[#145A3B]"
                        }`}
                    >
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                    {errors.role && (
                        <p className="text-red-500 text-sm mt-1.5 font-medium">
                            {errors.role}
                        </p>
                    )}
                </div>

                <div>
                    <label className="font-semibold text-gray-700 block">
                        Status
                    </label>
                    <select
                        value={form.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                        className={`w-full border bg-white rounded-2xl mt-2 px-4 py-3.5 focus:outline-none transition ${
                            errors.status
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 focus:border-[#145A3B]"
                        }`}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blocked">Blocked</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-500 text-sm mt-1.5 font-medium">
                            {errors.status}
                        </p>
                    )}
                </div>
            </div>

            <div className="pt-4">
                <button className="w-full md:w-auto bg-[#145A3B] hover:bg-[#0F472E] text-white px-8 py-4 rounded-2xl font-semibold transition shadow-sm">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
