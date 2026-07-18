const ADDRESS_KEY = "reuse_addresses";

export interface Address {
  id: number;
  userId: number;
  label: string; // e.g. "Rumah", "Kantor"
  recipient: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

const SEED: Address[] = [
  {
    id: 1,
    userId: 4,
    label: "Rumah",
    recipient: "Amanda",
    phone: "087700000004",
    address: "Jl. Mawar No. 12, RT 03/RW 05",
    city: "Bandung",
    province: "Jawa Barat",
    postalCode: "40111",
    isDefault: true,
  },
];

const load = (): Address[] => {
  if (typeof window === "undefined") return SEED;
  const raw = localStorage.getItem(ADDRESS_KEY);
  if (!raw) {
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(SEED));
    return SEED;
  }
  try { return JSON.parse(raw); } catch { return SEED; }
};

const save = (data: Address[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(data));
  }
};

export const getAddresses = (userId: number): Address[] =>
  load().filter((a) => a.userId === userId);

export const getDefaultAddress = (userId: number): Address | undefined =>
  load().find((a) => a.userId === userId && a.isDefault);

export const addAddress = (data: Omit<Address, "id">): Address => {
  const all = load();
  const newId = all.length > 0 ? Math.max(...all.map((a) => a.id)) + 1 : 1;
  const newAddr: Address = { ...data, id: newId };
  // If this is first or isDefault, clear others
  if (newAddr.isDefault) {
    all.forEach((a) => { if (a.userId === data.userId) a.isDefault = false; });
  }
  all.push(newAddr);
  save(all);
  return newAddr;
};

export const updateAddress = (id: number, data: Partial<Omit<Address, "id">>, userId?: number): void => {
  const all = load();
  const idx = all.findIndex((a) => a.id === id && (userId === undefined || a.userId === userId));
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...data };
    save(all);
  }
};

export const deleteAddress = (id: number, userId?: number): void => {
  save(load().filter((a) => !(a.id === id && (userId === undefined || a.userId === userId))));
};

export const setDefaultAddress = (userId: number, id: number): void => {
  const all = load();
  all.forEach((a) => {
    if (a.userId === userId) a.isDefault = a.id === id;
  });
  save(all);
};
