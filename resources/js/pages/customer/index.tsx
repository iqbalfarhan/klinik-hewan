import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Customer } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CustomerFormSheet from './components/customer-form-sheet';

const ListCustomer = ({ customers }: { customers: Customer[] }) => {
    const [cari, setCari] = useState('');
    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Settings',
                    href: '/',
                },
                {
                    title: 'customer',
                    href: route('customer.index'),
                },
            ]}
        >
            <div className="flex gap-4">
                <Input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari customer" className="w-full" />
                <CustomerFormSheet purpose="create">
                    <Button>Create new customer</Button>
                </CustomerFormSheet>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Pets</TableHead>
                        <TableHead>action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers
                        .filter((customer) => customer.name.includes(cari))
                        .map((customer, index) => (
                            <TableRow key={customer.id}>
                                <TableHead>{index + 1}</TableHead>
                                <TableHead>{customer.name}</TableHead>
                                <TableHead>{customer.phone}</TableHead>
                                <TableHead>{customer.pets?.length}</TableHead>
                                <TableHead>
                                    <Button variant={'ghost'} size={'icon'}>
                                        <Link href={route('customer.show', customer.id)}>
                                            <Folder />
                                        </Link>
                                    </Button>
                                    <CustomerFormSheet purpose="edit" customer={customer}>
                                        <Button variant={'ghost'} size={'icon'}>
                                            <Edit />
                                        </Button>
                                    </CustomerFormSheet>
                                    <Button variant={'ghost'} size={'icon'}>
                                        <Link href={route('customer.destroy', customer.id)} method="delete">
                                            <Trash2 />
                                        </Link>
                                    </Button>
                                </TableHead>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
};

export default ListCustomer;
