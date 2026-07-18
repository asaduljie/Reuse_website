"use client";

import { FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaUser, FaEnvelope } from "react-icons/fa";
import VerificationBadge from "./VerificationBadge";
import { SellerProfile } from "../../../services/sellerService";

interface Props {
    seller: SellerProfile;
    ownerName: string;
    email: string;
}

export default function SellerProfileCard({ seller, ownerName, email }: Props) {
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="bg-white rounded-[30px] shadow-sm overflow-hidden border border-gray-100">
            {/* Banner */}
            <div className="h-48 md:h-64 relative bg-gray-100">
                {seller.banner ? (
                    <img
                        src={seller.banner}
                        alt={`${seller.storeName} Banner`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200";
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-[#145A3B] to-[#1a774e]" />
                )}
            </div>

            {/* Profile Info */}
            <div className="p-8 md:p-10 relative">
                {/* Logo overlapping banner */}
                <div className="absolute -top-16 left-8 md:left-10 w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                    {seller.logo ? (
                        <img
                            src={seller.logo}
                            alt={seller.storeName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    seller.storeName
                                )}&background=145A3B&color=fff&size=112`;
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-[#145A3B] text-white flex items-center justify-center font-bold text-3xl">
                            {seller.storeName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="pt-14 md:pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-3xl font-bold text-gray-800">{seller.storeName}</h2>
                            <VerificationBadge verified={seller.verified} />
                        </div>

                        <p className="text-gray-600 max-w-2xl text-base leading-relaxed">
                            {seller.description || "Belum ada deskripsi toko."}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500 pt-2">
                            <div className="flex items-center gap-2.5">
                                <FaUser className="text-[#145A3B] text-base" />
                                <span>
                                    Owner: <strong>{ownerName}</strong>
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <FaEnvelope className="text-[#145A3B] text-base" />
                                <span>{email}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <FaPhone className="text-[#145A3B] text-base" />
                                <span>{seller.phone || "-"}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <FaCalendarAlt className="text-[#145A3B] text-base" />
                                <span>Bergabung: {formatDate(seller.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location Info */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-800 text-lg mb-3 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        Alamat Toko
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {seller.address}
                        <br />
                        {seller.city}, {seller.province} {seller.postalCode && `- ${seller.postalCode}`}
                    </p>
                </div>
            </div>
        </div>
    );
}
