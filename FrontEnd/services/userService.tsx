export type UserRole =
    | "super_admin"
    | "admin"
    | "seller"
    | "customer";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role: UserRole;
    status: "active" | "inactive" | "blocked" | "banned";
    createdAt: string;
    updatedAt: string;
}

const users: User[] = [
    {
        id: 1,
        name: "Super Admin",
        email: "admin@reuse.com",
        phone: "081111111111",
        avatar: "/images/avatars/admin.png",
        role: "super_admin",
        status: "active",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: 2,
        name: "Admin",
        email: "admin2@reuse.com",
        phone: "082222222222",
        avatar: "/images/avatars/admin2.png",
        role: "admin",
        status: "active",
        createdAt: "2026-01-02T00:00:00.000Z",
        updatedAt: "2026-01-02T00:00:00.000Z"
    },
    {
        id: 3,
        name: "Seller One",
        email: "seller@reuse.com",
        phone: "083333333333",
        avatar: "/images/avatars/seller.png",
        role: "seller",
        status: "active",
        createdAt: "2026-01-03T00:00:00.000Z",
        updatedAt: "2026-01-03T00:00:00.000Z"
    },
    {
        id: 4,
        name: "Amanda",
        email: "customer@reuse.com",
        phone: "084444444444",
        avatar: "/images/avatars/customer.png",
        role: "customer",
        status: "active",
        createdAt: "2026-01-04T00:00:00.000Z",
        updatedAt: "2026-01-04T00:00:00.000Z"
    }
];

const PROFILE_KEY = "reuse_customer_profiles";
export interface CustomerPreferences { notifications: boolean; language: "id" | "en"; }

function savedUsers(): User[] {
    if (typeof window === "undefined") return users;
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null") || users; } catch { return users; }
}

function persistUsers(data: User[]) {
    if (typeof window !== "undefined") localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
}

export function getUsers() {
    return users;
}

export function getUser(id: number) {
    return savedUsers().find(user => user.id === id);
}

export function addUser(user: User) {
    users.push(user);
}

export function updateUser(id: number, data: Partial<User>) {
    const dataSource = savedUsers();
    const index = dataSource.findIndex(user => user.id === id);
    if (index !== -1) {
        dataSource[index] = {
            ...dataSource[index],
            ...data,
            updatedAt: new Date().toISOString(),
        };
        persistUsers(dataSource);
        const authUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
        if (authUser && Number(JSON.parse(authUser).id) === id) localStorage.setItem("user", JSON.stringify({ ...JSON.parse(authUser), ...dataSource[index] }));
    }
}

export function getCustomerPreferences(userId: number): CustomerPreferences {
    if (typeof window === "undefined") return { notifications: true, language: "id" };
    try { return JSON.parse(localStorage.getItem(`reuse_preferences_${userId}`) || "null") || { notifications: true, language: "id" }; } catch { return { notifications: true, language: "id" }; }
}

export function saveCustomerPreferences(userId: number, value: CustomerPreferences) {
    if (typeof window !== "undefined") localStorage.setItem(`reuse_preferences_${userId}`, JSON.stringify(value));
}

export async function changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    if (!userId || !currentPassword || newPassword.length < 8) throw new Error("Password baru minimal 8 karakter.");
    if (typeof window !== "undefined") localStorage.setItem(`reuse_password_changed_${userId}`, new Date().toISOString());
}

export function deleteUser(id: number) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
    }
}

export function getCustomers() {
    return users.filter(user => user.role === "customer");
}

export function getAdmins() {
    return users.filter(user => user.role === "admin");
}

export function getSellers() {
    return users.filter(user => user.role === "seller");
}
