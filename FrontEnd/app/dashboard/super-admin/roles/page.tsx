"use client";

import { useEffect, useState } from "react";
import SuperAdminHeader from "../../../../components/dashboard/super-admin/SuperAdminHeader";
import RoleTable from "../../../../components/dashboard/super-admin/RoleTable";
import RoleForm from "../../../../components/dashboard/super-admin/RoleForm";
import AssignPermissionModal from "../../../../components/dashboard/super-admin/AssignPermissionModal";
import ConfirmDialog from "../../../../components/dashboard/common/ConfirmDialog";
import Toast, { useToast } from "../../../../components/dashboard/common/Toast";
import { getRoles, createRole, updateRole, deleteRole, duplicateRole, Role } from "../../../../services/roleService";
import { FaPlus, FaLock } from "react-icons/fa";

export default function SuperAdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const { toasts, show, dismiss } = useToast();

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  const [permRole, setPermRole] = useState<Role | null>(null);
  const [deleteRoleId, setDeleteRoleId] = useState<string | null>(null);

  const loadData = () => {
    setRoles(getRoles());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateOrUpdate = (name: string, description: string) => {
    try {
      if (selectedRole) {
        updateRole(selectedRole.id, name, description);
        show("Role berhasil diperbarui!", "success");
      } else {
        createRole(name, description);
        show("Role baru berhasil didaftarkan!", "success");
      }
      setIsFormOpen(false);
      setSelectedRole(null);
      loadData();
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan role.");
    }
  };

  const handleDuplicate = (role: Role) => {
    const newName = prompt("Masukkan nama role baru:", `${role.name} Copy`);
    if (!newName) return;
    try {
      duplicateRole(role.id, newName);
      show("Role berhasil diduplikasi!", "success");
      loadData();
    } catch (err: any) {
      alert(err.message || "Gagal menduplikasi role.");
    }
  };

  const handleDelete = () => {
    if (!deleteRoleId) return;
    try {
      deleteRole(deleteRoleId);
      setDeleteRoleId(null);
      loadData();
      show("Role berhasil dihapus!", "success");
    } catch (err: any) {
      alert(err.message || "Gagal menghapus role.");
    }
  };

  return (
    <div className="space-y-8">
      <SuperAdminHeader
        title="Role & Hak Akses (Permissions)"
        breadcrumbs={[{ label: "Roles & Permissions" }]}
      />

      {/* Toolbar actions */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center justify-between">
        <div>
          <h4 className="font-extrabold text-gray-800 text-sm">Daftar Wewenang Sistem</h4>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Kelola tingkat kewenangan akses dan permission matrix.</p>
        </div>
        <button
          onClick={() => { setSelectedRole(null); setIsFormOpen(true); }}
          className="flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition"
        >
          <FaPlus /> Tambah Role Kustom
        </button>
      </div>

      {/* Main role table */}
      <RoleTable
        roles={roles}
        onEdit={(role) => { setSelectedRole(role); setIsFormOpen(true); }}
        onDuplicate={handleDuplicate}
        onDelete={(id) => setDeleteRoleId(id)}
        onManagePermissions={(role) => setPermRole(role)}
      />

      {/* Create/Edit Modal Form */}
      <RoleForm
        isOpen={isFormOpen}
        role={selectedRole}
        onSave={handleCreateOrUpdate}
        onCancel={() => { setIsFormOpen(false); setSelectedRole(null); }}
      />

      {/* Permission Matrix Assignment Modal */}
      <AssignPermissionModal
        isOpen={permRole !== null}
        roleId={permRole?.id || ""}
        roleName={permRole?.name || ""}
        isSystem={permRole?.isSystem || false}
        onClose={() => setPermRole(null)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteRoleId !== null}
        title="Hapus Role Pengguna?"
        message="Menghapus role kustom juga akan menghapus seluruh data matriks izin terkait dari database. Lanjutkan?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteRoleId(null)}
      />

      {/* Toasts */}
      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
