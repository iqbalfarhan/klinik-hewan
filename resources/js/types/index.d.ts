import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    roles: string[];
    permissions: string[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    isAllowed?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: string[];
    [key: string]: unknown; // This allows for additional properties...
}

export type Customer = {
    id: number;
    name: string;
    phone: string;
    address: string;
    pets?: Pet[];
};

export type Category = {
    id: number;
    name: string;
    pets?: Pet[];
};

export type Pet = {
    id: number;
    name: string;
    category: Category;
    customer: Customer;
};
