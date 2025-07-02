import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium rem numquam dolor harum incidunt suscipit temporibus distinctio amet
            hic? Mollitia quidem ipsam eaque voluptate vitae dolores expedita doloribus amet ab.
        </AppLayout>
    );
}
