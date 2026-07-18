export type UserRole =

  | "customer"
  | "seller"
  | "admin"
  | "super_admin";

export interface AuthUser {

  id: number;

  name: string;

  email: string;

  role: UserRole;

}

export function getCurrentUser(): AuthUser | null {

  if (typeof window === "undefined") {

    return null;

  }

  const data = localStorage.getItem("user");

  if (!data) {

    return null;

  }

  return JSON.parse(data);

}

export function getCurrentRole(): UserRole | null {

  const user = getCurrentUser();

  return user?.role ?? null;

}

export function hasRole(

  roles: UserRole[]

): boolean {

  const role = getCurrentRole();

  if (!role) return false;

  return roles.includes(role);

}

export function isCustomer() {

  return hasRole(["customer"]);

}

export function isSeller() {

  return hasRole(["seller"]);

}

export function isAdmin() {

  return hasRole(["admin"]);

}

export function isSuperAdmin() {

  return hasRole(["super_admin"]);

}