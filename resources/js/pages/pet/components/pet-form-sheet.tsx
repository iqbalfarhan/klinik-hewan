import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Category, Customer, Pet } from '@/types';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
    pet?: Pet;
    customers: Customer[];
    categories: Category[];
    purpose: 'create' | 'edit';
};

const PetFormSheet: FC<Props> = ({ children, purpose, pet, customers, categories }) => {
    const { data, setData, post, put } = useForm({
        name: pet?.name ?? '',
        customer_id: pet?.customer.id ?? '',
        category_id: pet?.category.id ?? '',
    });

    const handleSubmit = () => {
        if (purpose === 'create') {
            post(route('pet.store'));
        } else {
            put(route('pet.update', pet?.id));
        }
    };

    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="capitalize">{purpose} data pet</SheetTitle>
                </SheetHeader>

                <Select value={data.customer_id.toString()} onValueChange={(value) => setData('customer_id', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                        {customers.map((customer) => (
                            <SelectItem key={customer.id} value={customer.id.toString()}>
                                {customer.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={data.category_id.toString()} onValueChange={(value) => setData('category_id', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" />

                <SheetFooter>
                    <Button onClick={handleSubmit}>Simpan</Button>
                    <SheetClose asChild>
                        <Button>Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default PetFormSheet;
