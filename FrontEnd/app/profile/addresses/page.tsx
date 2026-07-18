"use client";

import { useEffect, useState } from "react";
import { getUser } from "../../../utils/auth";
import { getAddresses, Address } from "../../../services/addressService";
import AccountMenu from "../../../components/customer/AccountMenu";
import AddressBook from "../../../components/customer/AddressBook";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [userId, setUserId] = useState(4);

  const loadAddresses = () => {
    const u = getUser();
    const uid = u?.id ?? 4;
    setUserId(uid);
    setAddresses(getAddresses(uid));
  };

  useEffect(() => { loadAddresses(); }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FA] py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Akun Saya</p>
          <h1 className="text-3xl font-black text-gray-900 mt-1">Buku Alamat</h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">Kelola alamat pengiriman Anda.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-56 shrink-0"><AccountMenu /></div>
          <div className="flex-1 min-w-0">
            <AddressBook addresses={addresses} userId={userId} onUpdate={loadAddresses} />
          </div>
        </div>
      </div>
    </div>
  );
}
