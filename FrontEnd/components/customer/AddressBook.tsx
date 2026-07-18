"use client";

import { useState } from "react";
import { Address, addAddress, updateAddress, deleteAddress, setDefaultAddress } from "../../services/addressService";
import { FaPlus, FaEdit, FaTrash, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import ConfirmDialog from "../dashboard/common/ConfirmDialog";

interface Props {
  addresses: Address[];
  userId: number;
  onUpdate: () => void;
}

const EMPTY_FORM: Omit<Address, "id" | "userId" | "isDefault"> = {
  label: "", recipient: "", phone: "", address: "", city: "", province: "", postalCode: "",
};

export default function AddressBook({ addresses, userId, onUpdate }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); };
  const openEdit = (a: Address) => {
    const { id, userId: _uid, isDefault, ...rest } = a;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      updateAddress(editId, form);
    } else {
      addAddress({ ...form, userId, isDefault: addresses.length === 0 });
    }
    setShowForm(false);
    onUpdate();
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteAddress(deleteId);
      setDeleteId(null);
      onUpdate();
    }
  };

  const Field = ({ label, field, required = false }: { label: string; field: keyof typeof form; required?: boolean }) => (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1">{label}{required && " *"}</label>
      <input
        value={form[field]}
        onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition"
        required={required}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-gray-800">📍 Daftar Alamat</h3>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition"
        >
          <FaPlus /> Tambah Alamat
        </button>
      </div>

      {addresses.length === 0 && !showForm && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-12 text-center">
          <FaMapMarkerAlt className="text-5xl text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-bold">Belum ada alamat tersimpan</p>
        </div>
      )}

      <div className="grid gap-3">
        {addresses.map((a) => (
          <div key={a.id} className={`bg-white rounded-3xl border shadow-sm p-5 ${a.isDefault ? "border-emerald-200 bg-emerald-50/30" : "border-gray-100"}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">{a.label}</span>
                  {a.isDefault && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <FaStar className="text-amber-500" /> Utama
                    </span>
                  )}
                </div>
                <p className="font-bold text-gray-800 mt-2">{a.recipient} · {a.phone}</p>
                <p className="text-sm text-gray-500 font-semibold mt-0.5">{a.address}, {a.city}, {a.province} {a.postalCode}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {!a.isDefault && (
                  <button onClick={() => { setDefaultAddress(userId, a.id); onUpdate(); }} className="text-xs bg-white border border-emerald-200 text-emerald-700 px-2.5 py-1.5 rounded-xl font-bold hover:bg-emerald-50 transition">
                    <FaStar className="text-[10px]" />
                  </button>
                )}
                <button onClick={() => openEdit(a)} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1.5 rounded-xl font-bold hover:bg-gray-50 transition">
                  <FaEdit className="text-[10px]" />
                </button>
                <button onClick={() => setDeleteId(a.id)} className="text-xs bg-red-50 border border-red-100 text-red-500 px-2.5 py-1.5 rounded-xl font-bold hover:bg-red-100 transition">
                  <FaTrash className="text-[10px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <h4 className="font-extrabold text-gray-800 mb-5">{editId ? "Edit Alamat" : "Tambah Alamat Baru"}</h4>
          <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
            <Field label="Label (Rumah/Kantor)" field="label" required />
            <Field label="Nama Penerima" field="recipient" required />
            <Field label="Nomor HP" field="phone" required />
            <Field label="Kota" field="city" required />
            <div className="col-span-2"><Field label="Alamat Lengkap" field="address" required /></div>
            <Field label="Provinsi" field="province" required />
            <Field label="Kode Pos" field="postalCode" />
            <div className="col-span-2 flex gap-3 justify-end pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-2xl text-sm font-bold transition">Batal</button>
              <button type="submit" className="bg-[#145A3B] hover:bg-[#0F472E] text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm transition">Simpan Alamat</button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Hapus Alamat?"
        message="Alamat ini akan dihapus permanen dan tidak dapat dikembalikan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
