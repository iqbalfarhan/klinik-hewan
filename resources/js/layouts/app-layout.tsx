import Heading from '@/components/heading';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <div className="space-y-6 p-6">
            <Heading title="Dashboard" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, fugiat." />
            {children}
        </div>
    </AppLayoutTemplate>
);
