const PERM_KEY = "reuse_permissions";

export type Resource = "products" | "orders" | "users" | "sellers" | "banners" | "reports" | "categories" | "dashboard" | "settings";
export type Action = "view" | "create" | "update" | "delete" | "approve" | "export";

export type PermissionMatrix = Record<string, Record<string, Record<string, boolean>>>;

const DEFAULT_MATRIX: PermissionMatrix = {
  super_admin: {
    dashboard:  { view: true,  create: true,  update: true,  delete: true,  approve: true,  export: true  },
    products:   { view: true,  create: true,  update: true,  delete: true,  approve: true,  export: true  },
    orders:     { view: true,  create: true,  update: true,  delete: true,  approve: true,  export: true  },
    users:      { view: true,  create: true,  update: true,  delete: true,  approve: true,  export: true  },
    sellers:    { view: true,  create: true,  update: true,  delete: true,  approve: true,  export: true  },
    banners:    { view: true,  create: true,  update: true,  delete: true,  approve: true,  export: true  },
    reports:    { view: true,  create: true,  update: true,  delete: true,  approve: true,  export: true  },
    categories: { view: true,  create: true,  update: true,  delete: true,  approve: true,  export: true  },
    settings:   { view: true,  create: true,  update: true,  delete: true,  approve: true,  export: true  },
  },
  admin: {
    dashboard:  { view: true,  create: false, update: false, delete: false, approve: false, export: false },
    products:   { view: true,  create: true,  update: true,  delete: true,  approve: false, export: true  },
    orders:     { view: true,  create: false, update: true,  delete: false, approve: true,  export: true  },
    users:      { view: true,  create: true,  update: true,  delete: false, approve: false, export: true  },
    sellers:    { view: true,  create: false, update: true,  delete: false, approve: true,  export: true  },
    banners:    { view: true,  create: true,  update: true,  delete: true,  approve: false, export: false },
    reports:    { view: true,  create: false, update: false, delete: false, approve: false, export: true  },
    categories: { view: true,  create: true,  update: true,  delete: true,  approve: false, export: false },
    settings:   { view: true,  create: false, update: true,  delete: false, approve: false, export: false },
  },
  seller: {
    dashboard:  { view: true,  create: false, update: false, delete: false, approve: false, export: false },
    products:   { view: true,  create: true,  update: true,  delete: true,  approve: false, export: false },
    orders:     { view: true,  create: false, update: true,  delete: false, approve: false, export: false },
    users:      { view: false, create: false, update: false, delete: false, approve: false, export: false },
    sellers:    { view: true,  create: false, update: true,  delete: false, approve: false, export: false },
    banners:    { view: false, create: false, update: false, delete: false, approve: false, export: false },
    reports:    { view: true,  create: false, update: false, delete: false, approve: false, export: true  },
    categories: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    settings:   { view: false, create: false, update: false, delete: false, approve: false, export: false },
  },
  customer: {
    dashboard:  { view: false, create: false, update: false, delete: false, approve: false, export: false },
    products:   { view: true,  create: false, update: false, delete: false, approve: false, export: false },
    orders:     { view: true,  create: true,  update: false, delete: false, approve: false, export: false },
    users:      { view: false, create: false, update: true,  delete: false, approve: false, export: false },
    sellers:    { view: false, create: false, update: false, delete: false, approve: false, export: false },
    banners:    { view: false, create: false, update: false, delete: false, approve: false, export: false },
    reports:    { view: false, create: false, update: false, delete: false, approve: false, export: false },
    categories: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    settings:   { view: false, create: false, update: false, delete: false, approve: false, export: false },
  },
};

export const RESOURCES: Resource[] = ["dashboard", "products", "orders", "users", "sellers", "banners", "reports", "categories", "settings"];
export const ACTIONS: Action[] = ["view", "create", "update", "delete", "approve", "export"];

export const getPermissions = (): PermissionMatrix => {
  if (typeof window === "undefined") return DEFAULT_MATRIX;
  const raw = localStorage.getItem(PERM_KEY);
  if (!raw) {
    localStorage.setItem(PERM_KEY, JSON.stringify(DEFAULT_MATRIX));
    return DEFAULT_MATRIX;
  }
  try {
    const parsed = JSON.parse(raw);
    // Ensure all default roles and resources exist in the parsed object
    const merged = { ...DEFAULT_MATRIX };
    Object.keys(parsed).forEach(role => {
      merged[role] = { ...merged[role], ...parsed[role] };
    });
    return merged;
  } catch {
    return DEFAULT_MATRIX;
  }
};

export const savePermissions = (matrix: PermissionMatrix): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(PERM_KEY, JSON.stringify(matrix));
  }
};

export const togglePermission = (
  role: string,
  resource: Resource,
  action: Action
): PermissionMatrix => {
  const matrix = getPermissions();
  if (!matrix[role]) matrix[role] = {};
  if (!matrix[role][resource]) matrix[role][resource] = {};
  
  matrix[role][resource][action] = !matrix[role][resource][action];
  savePermissions(matrix);
  return { ...matrix };
};

