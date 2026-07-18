"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface Props {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function SuperAdminHeader({ title, breadcrumbs = [] }: Props) {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2">
          <Link href="/dashboard/super-admin" className="hover:text-[#145A3B] transition">
            Super Admin
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <FaChevronRight className="text-[8px]" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-[#145A3B] transition">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#145A3B]">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Main Header title */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Panel Tertinggi</p>
        <h1 className="text-4xl font-black text-gray-900 mt-1.5">{title}</h1>
      </div>
    </div>
  );
}
