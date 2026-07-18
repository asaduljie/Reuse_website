import {
  FaChartPie,
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaStore,
  FaClipboardList,
  FaImages,
  FaCog,
  FaUserShield,
  FaUserTie,
  FaHistory,
  FaPlusCircle,
  FaUserCircle,
  FaChartBar,
  FaChartLine,
  FaBell,
  FaScroll,
  FaExclamationTriangle,
  FaRobot,
} from "react-icons/fa";

export interface DashboardMenu {
  title: string;
  href: string;
  icon: any;
}

export const sellerMenus: DashboardMenu[] = [
  { title: "Dashboard",    href: "/dashboard/seller",            icon: FaChartPie },
  { title: "My Products",  href: "/dashboard/seller/products",   icon: FaBoxOpen },
  { title: "Add Product",  href: "/dashboard/seller/products/new", icon: FaPlusCircle },
  { title: "Orders",       href: "/dashboard/seller/orders",     icon: FaClipboardList },
  { title: "Analytics",   href: "/dashboard/seller/analytics",  icon: FaChartLine },
  { title: "Profile",      href: "/dashboard/seller/profile",    icon: FaUserCircle },
];

export const adminMenus: DashboardMenu[] = [
  { title: "Dashboard",    href: "/dashboard/admin",               icon: FaChartPie },
  { title: "Products",     href: "/dashboard/admin/products",      icon: FaBoxOpen },
  { title: "Categories",   href: "/dashboard/admin/categories",    icon: FaTags },
  { title: "Orders",       href: "/dashboard/admin/orders",        icon: FaClipboardList },
  { title: "Users",        href: "/dashboard/admin/users",         icon: FaUsers },
  { title: "Seller",       href: "/dashboard/admin/sellers",       icon: FaStore },
  { title: "Banner",       href: "/dashboard/admin/banners",       icon: FaImages },
  { title: "Reports",      href: "/dashboard/admin/reports",       icon: FaChartBar },
  { title: "AI Assistant", href: "/dashboard/admin/assistant",     icon: FaRobot },
  { title: "Activity Log", href: "/dashboard/admin/activity",      icon: FaHistory },
  { title: "Notifications",href: "/dashboard/notifications",       icon: FaBell },
  { title: "System Logs",  href: "/dashboard/admin/system-logs",   icon: FaExclamationTriangle },
  { title: "Settings",     href: "/dashboard/admin/settings",      icon: FaCog },
];

export const superAdminMenus: DashboardMenu[] = [
  { title: "Dashboard",    href: "/dashboard/super-admin",          icon: FaChartPie },
  { title: "Products",     href: "/dashboard/super-admin/products", icon: FaBoxOpen },
  { title: "Categories",   href: "/dashboard/super-admin/categories", icon: FaTags },
  { title: "Orders",       href: "/dashboard/super-admin/orders",   icon: FaClipboardList },
  { title: "Sellers",      href: "/dashboard/super-admin/sellers",  icon: FaStore },
  { title: "Customers",    href: "/dashboard/super-admin/customers", icon: FaUsers },
  { title: "Users",        href: "/dashboard/super-admin/users",    icon: FaUserShield },
  { title: "Admins",       href: "/dashboard/super-admin/admins",   icon: FaUserTie },
  { title: "AI Assistant", href: "/dashboard/admin/assistant",     icon: FaRobot },
  { title: "Activity Logs",href: "/dashboard/super-admin/activity", icon: FaHistory },
  { title: "Notifications",href: "/dashboard/notifications",        icon: FaBell },
  { title: "Roles & Perms",href: "/dashboard/super-admin/roles",   icon: FaUserShield },
  { title: "System Logs",  href: "/dashboard/admin/system-logs",    icon: FaExclamationTriangle },
  { title: "Settings",     href: "/dashboard/super-admin/settings", icon: FaCog },
];
