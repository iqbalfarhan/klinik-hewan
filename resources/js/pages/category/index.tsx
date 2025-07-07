import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Category } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CategoryFormSheet from './components/category-form-sheet';

const ListCategory = ({ categories }: { categories: Category[] }) => {
    const [cari, setCari] = useState('');
    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Settings',
                    href: '/',
                },
                {
                    title: 'category',
                    href: route('category.index'),
                },
            ]}
        >
            <div className="flex gap-4">
                <Input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari category" className="w-full" />
                <CategoryFormSheet purpose="create">
                    <Button>Create new category</Button>
                </CategoryFormSheet>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Pets</TableHead>
                        <TableHead>action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories
                        .filter((category) => category.name.includes(cari))
                        .map((category, index) => (
                            <TableRow key={category.id}>
                                <TableHead>{index + 1}</TableHead>
                                <TableHead>{category.name}</TableHead>
                                <TableHead>{category.pets?.length}</TableHead>
                                <TableHead>
                                    <Button variant={'ghost'} size={'icon'}>
                                        <Link href={route('category.show', category.id)}>
                                            <Folder />
                                        </Link>
                                    </Button>
                                    <CategoryFormSheet purpose="edit" category={category}>
                                        <Button variant={'ghost'} size={'icon'}>
                                            <Edit />
                                        </Button>
                                    </CategoryFormSheet>
                                    <Button variant={'ghost'} size={'icon'}>
                                        <Link href={route('category.destroy', category.id)} method="delete">
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

export default ListCategory;
