import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { useState } from 'react';
import UserFormSheet from './components/user-form-sheet';

const ListUser = ({ users }: { users: User[] }) => {
    const [cari, setCari] = useState('');
    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Settings',
                    href: '/',
                },
                {
                    title: 'User',
                    href: route('user.index'),
                },
            ]}
        >
            <div className="flex gap-4">
                <Input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari user" className="w-full" />
                <UserFormSheet purpose="create">
                    <Button>Create new user</Button>
                </UserFormSheet>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users
                        .filter((user) => user.name.includes(cari))
                        .map((user, index) => (
                            <TableRow key={user.id}>
                                <TableHead>{index + 1}</TableHead>
                                <TableHead>{user.name}</TableHead>
                                <TableHead>{user.email}</TableHead>
                                <TableHead>
                                    <Button variant={'ghost'} size={'icon'}>
                                        <Link href={route('user.show', user.id)}>
                                            <Folder />
                                        </Link>
                                    </Button>
                                    <UserFormSheet purpose="edit" user={user}>
                                        <Button variant={'ghost'} size={'icon'}>
                                            <Edit />
                                        </Button>
                                    </UserFormSheet>
                                    <Button variant={'ghost'} size={'icon'}>
                                        <Link href={route('user.destroy', user.id)} method="delete">
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

export default ListUser;
