"use client";

interface CustomerHeaderProps {
    title?: string;
    description?: string;
}

export default function CustomerHeader({
    title = "Customers",
    description = "Kelola seluruh data customer marketplace.",
}: CustomerHeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-500 mt-3">{description}</p>
            </div>
        </div>
    );
}
