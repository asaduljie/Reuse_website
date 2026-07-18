"use client";

import { RESOURCES, ACTIONS, PermissionMatrix, Resource, Action } from "../../../services/permissionService";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface Props {
  roleId: string;
  roleName: string;
  matrix: PermissionMatrix;
  onToggle: (resource: Resource, action: Action) => void;
  isSystem?: boolean;
}

export default function PermissionTable({ roleId, roleName, matrix, onToggle, isSystem = false }: Props) {
  const rolePerms = matrix[roleId] || {};

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-gray-800">
            Hak Akses Role: <span className="text-[#145A3B]">{roleName}</span>
          </h3>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            {isSystem ? "ℹ Role sistem bawaan disarankan untuk tidak diubah secara radikal." : "✓ Klik kotak centang untuk langsung mengubah hak akses."}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Modul / Resource</th>
              {ACTIONS.map((action) => (
                <th key={action} className="px-4 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-center capitalize">
                  {action}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm font-semibold text-gray-700">
            {RESOURCES.map((resource) => {
              const resPerms = rolePerms[resource] || {};
              return (
                <tr key={resource} className="hover:bg-gray-50/30 transition">
                  <td className="px-6 py-4">
                    <span className="font-extrabold text-gray-800 capitalize">{resource}</span>
                    <span className="block text-[10px] text-gray-400 font-mono mt-0.5">{resource}.*</span>
                  </td>
                  {ACTIONS.map((action) => {
                    const isAllowed = !!resPerms[action];
                    return (
                      <td key={action} className="px-4 py-4 text-center">
                        <button
                          onClick={() => onToggle(resource, action)}
                          className={`w-10 h-10 rounded-2xl inline-flex items-center justify-center border transition ${
                            isAllowed
                              ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                              : "bg-gray-50 border-gray-200 text-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {isAllowed ? (
                            <FaCheckCircle className="text-base" />
                          ) : (
                            <FaTimesCircle className="text-base" />
                          )}
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
  );
}
