import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Category, Customer, Pet } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { useState } from 'react';
import PetFormSheet from './components/pet-form-sheet';

const ListPet = ({ pets, customers, categories }: { pets: Pet[]; customers: Customer[]; categories: Category[] }) => {
    const [cari, setCari] = useState('');
    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Settings',
                    href: '/',
                },
                {
                    title: 'pet',
                    href: route('pet.index'),
                },
            ]}
        >
            <div className="flex gap-4">
                <Input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari pet" className="w-full" />
                <PetFormSheet purpose="create" customers={customers} categories={categories}>
                    <Button>Create new pet</Button>
                </PetFormSheet>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Species</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pets
                        .filter((pet) => pet.name.includes(cari))
                        .map((pet, index) => (
                            <TableRow key={pet.id}>
                                <TableHead>{index + 1}</TableHead>
                                <TableHead>{pet.customer?.name}</TableHead>
                                <TableHead>{pet.category?.name}</TableHead>
                                <TableHead>{pet.name}</TableHead>
                                <TableHead>
                                    <Button variant={'ghost'} size={'icon'}>
                                        <Link href={route('pet.show', pet.id)}>
                                            <Folder />
                                        </Link>
                                    </Button>
                                    <PetFormSheet purpose="edit" pet={pet} customers={customers} categories={categories}>
                                        <Button variant={'ghost'} size={'icon'}>
                                            <Edit />
                                        </Button>
                                    </PetFormSheet>
                                    <Button variant={'ghost'} size={'icon'}>
                                        <Link href={route('pet.destroy', pet.id)} method="delete">
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

export default ListPet;
