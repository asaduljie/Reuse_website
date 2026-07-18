"use client";

import { useEffect, useState } from "react";
import SuperAdminHeader from "../../../../components/dashboard/super-admin/SuperAdminHeader";
import { getPermissions, PermissionMatrix, togglePermission, RESOURCES, ACTIONS, Resource, Action } from "../../../../services/permissionService";
import { getRoles, Role } from "../../../../services/roleService";
import { FaCheckCircle, FaTimesCircle, FaLock } from "react-icons/fa";

export default function SuperAdminPermissionsPage() {
  const [matrix, setMatrix] = useState<PermissionMatrix>({});
  const [roles, setRoles] = useState<Role[]>([]);
  const [activeTab, setActiveTab] = useState<string>("super_admin");

  const loadData = () => {
    setMatrix(getPermissions());
    setRoles(getRoles());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggle = (resource: Resource, action: Action) => {
    togglePermission(activeTab, resource, action);
    loadData();
  };

  const selectedRole = roles.find((r) => r.id === activeTab);

  return (
    <div className="space-y-8">
      <SuperAdminHeader
        title="Matriks Hak Akses Global"
        breadcrumbs={[{ label: "Permissions" }]}
      />

      {/* Role selector tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-4">
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveTab(r.id)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === r.id
                ? "bg-[#145A3B] text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {r.name}
            {r.isSystem && <FaLock className="text-[10px]" />}
          </button>
        ))}
      </div>

      {selectedRole && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="mb-4">
            <h3 className="font-extrabold text-gray-800 text-sm">Deskripsi Role</h3>
            <p className="text-xs text-gray-500 font-semibold mt-1">{selectedRole.description}</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Modul</th>
                  {ACTIONS.map((action) => (
                    <th key={action} className="px-4 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-center capitalize">
                      {action}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm font-semibold text-gray-700">
                {RESOURCES.map((resource) => {
                  return (
                    <tr key={resource} className="hover:bg-gray-50/20 transition">
                      <td className="px-6 py-4">
                        <span className="font-extrabold text-gray-800 capitalize">{resource}</span>
                      </td>
                      {ACTIONS.map((action) => {
                        const val = !!matrix[activeTab]?.[resource]?.[action];
                        return (
                          <td key={action} className="px-4 py-4 text-center">
                            <button
                              onClick={() => handleToggle(resource, action)}
                              className={`w-10 h-10 rounded-2xl inline-flex items-center justify-center border transition ${
                                val
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                                  : "bg-gray-50 border-gray-200 text-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              {val ? <FaCheckCircle className="text-base" /> : <FaTimesCircle className="text-base" />}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
