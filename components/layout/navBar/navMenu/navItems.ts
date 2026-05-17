import { BookOpenCheck, Hotel, Plus } from "lucide-react";

interface  NavItem {
    label: string;
    route: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}
export const navItems:NavItem[] = [
    { label: "Add Hotel", route: "/hotel/new", icon: Plus },
    { label: "My Hotels", route: "/my-hotels", icon: Hotel },
    { label: "My Bookings", route: "/my-bookings", icon: BookOpenCheck },
]; 