import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { roles, permissions } = usePage<SharedData>().props.auth;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <pre>{JSON.stringify(roles, null, 2)}</pre>
            <pre>{JSON.stringify(permissions, null, 2)}</pre>
            <Head title="Dashboard" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium rem numquam dolor harum incidunt suscipit temporibus distinctio amet
            hic? Mollitia quidem ipsam eaque voluptate vitae dolores expedita doloribus amet ab.
        </AppLayout>
    );
}
