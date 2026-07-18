import { getProfile } from "../services/authService";

export const getToken = () => {

  if (typeof window === "undefined") {

    return null;

  }

  return localStorage.getItem("token");

};

export const saveRedirectPath = (path: string) => {

  if (typeof window === "undefined") return;

  sessionStorage.setItem(
    "redirectAfterLogin",
    path
  );

};

export const getRedirectPath = () => {

  if (typeof window === "undefined") return null;

  return sessionStorage.getItem(
    "redirectAfterLogin"
  );

};

export const clearRedirectPath = () => {

  if (typeof window === "undefined") return;

  sessionStorage.removeItem(
    "redirectAfterLogin"
  );

};

export const getUser = () => {

  if (typeof window === "undefined") {

    return null;

  }

  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;

};

export const refreshAuthUser = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const response = await getProfile(token);
    const user = response?.data?.user;

    if (!user) {
      return null;
    }

    const normalizedUser = {
      ...user,
      role:
        user.role === "user"
          ? "customer"
          : user.role === "admin"
            ? "admin"
            : user.role === "seller"
              ? "seller"
              : user.role === "super_admin"
                ? "super_admin"
                : user.role || "customer",
    };

    localStorage.setItem("user", JSON.stringify(normalizedUser));

    return normalizedUser;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      console.warn("Sesi autentikasi telah berakhir (401).");
      clearStoredAuth();
      return null;
    }
    console.error("Gagal refresh user:", error);
    return getUser();
  }
};

export const clearStoredAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isLoggedIn = () => {

  return !!getToken();

};

export const logout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

};