import { getPermissions } from "../services/permissionService";
import { getCurrentUser } from "../utils/roleGuard";

/**
 * Checks if a user role has the required permission.
 * Format: resource.action (e.g. "products.create")
 */
export function can(permission: string, userRole?: string): boolean {
  const role = userRole || getCurrentUser()?.role;
  if (!role) return false;

  // Super admin always has all permissions
  if (role === "super_admin") return true;

  const [resource, action] = permission.split(".");
  if (!resource || !action) return false;

  const matrix = getPermissions();
  const rolePermissions = matrix[role];
  if (!rolePermissions) return false;

  const resourcePermissions = rolePermissions[resource];
  if (!resourcePermissions) return false;

  return !!resourcePermissions[action];
}
