export interface Role {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  createdAt: string;
}

const ROLES_KEY = "reuse_roles";

const DEFAULT_ROLES: Role[] = [
  { id: "super_admin", name: "Super Admin", description: "Akses dan kontrol penuh atas seluruh sistem.", isSystem: true, createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "admin", name: "Admin", description: "Mengelola produk, order, kategori, dan banner.", isSystem: true, createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seller", name: "Seller", description: "Mengelola toko, produk sendiri, dan pesanan masuk.", isSystem: true, createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "customer", name: "Customer", description: "Membeli produk, melihat riwayat pesanan, dan mengelola wishlist.", isSystem: true, createdAt: "2026-01-01T00:00:00.000Z" },
];

export function getRoles(): Role[] {
  if (typeof window === "undefined") return DEFAULT_ROLES;
  const raw = localStorage.getItem(ROLES_KEY);
  if (!raw) {
    localStorage.setItem(ROLES_KEY, JSON.stringify(DEFAULT_ROLES));
    return DEFAULT_ROLES;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ROLES;
  }
}

export function saveRoles(roles: Role[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  }
}

export function createRole(name: string, description: string): Role {
  const roles = getRoles();
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  
  if (roles.some(r => r.id === id)) {
    throw new Error("Role ID sudah terdaftar.");
  }

  const newRole: Role = {
    id,
    name,
    description,
    isSystem: false,
    createdAt: new Date().toISOString(),
  };

  roles.push(newRole);
  saveRoles(roles);

  // Pre-seed permission entries for this new role (all false)
  const { getPermissions, savePermissions } = require("./permissionService");
  const matrix = getPermissions();
  matrix[id] = {
    products: { create: false, update: false, delete: false, approve: false, export: false },
    orders: { create: false, update: false, delete: false, approve: false, export: false },
    users: { create: false, update: false, delete: false, approve: false, export: false },
    sellers: { create: false, update: false, delete: false, approve: false, export: false },
    banners: { create: false, update: false, delete: false, approve: false, export: false },
    reports: { create: false, update: false, delete: false, approve: false, export: false },
    categories: { create: false, update: false, delete: false, approve: false, export: false },
  };
  savePermissions(matrix);

  return newRole;
}

export function updateRole(id: string, name: string, description: string): Role {
  const roles = getRoles();
  const index = roles.findIndex(r => r.id === id);
  if (index === -1) throw new Error("Role tidak ditemukan.");
  
  roles[index] = {
    ...roles[index],
    name,
    description,
  };
  saveRoles(roles);
  return roles[index];
}

export function deleteRole(id: string): void {
  const roles = getRoles();
  const role = roles.find(r => r.id === id);
  if (!role) throw new Error("Role tidak ditemukan.");
  if (role.isSystem) throw new Error("Role sistem bawaan tidak dapat dihapus.");

  const filtered = roles.filter(r => r.id !== id);
  saveRoles(filtered);

  // Clean up permission matrix mapping
  const { getPermissions, savePermissions } = require("./permissionService");
  const matrix = getPermissions();
  delete matrix[id];
  savePermissions(matrix);
}

export function duplicateRole(sourceId: string, newName: string): Role {
  const roles = getRoles();
  const sourceRole = roles.find(r => r.id === sourceId);
  if (!sourceRole) throw new Error("Role sumber tidak ditemukan.");

  const newId = newName.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  if (roles.some(r => r.id === newId)) {
    throw new Error("Role ID baru sudah terdaftar.");
  }

  const newRole: Role = {
    id: newId,
    name: newName,
    description: `Duplikasi dari ${sourceRole.name}. ${sourceRole.description}`,
    isSystem: false,
    createdAt: new Date().toISOString(),
  };

  roles.push(newRole);
  saveRoles(roles);

  // Copy matrix permission entries from source to target
  const { getPermissions, savePermissions } = require("./permissionService");
  const matrix = getPermissions();
  if (matrix[sourceId]) {
    matrix[newId] = JSON.parse(JSON.stringify(matrix[sourceId]));
    savePermissions(matrix);
  }

  return newRole;
}
