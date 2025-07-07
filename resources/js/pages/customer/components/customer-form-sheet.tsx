import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Customer } from '@/types';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
    customer?: Customer;
    purpose: 'create' | 'edit';
};

const CustomerFormSheet: FC<Props> = ({ children, purpose, customer }) => {
    const { data, setData, post, put } = useForm({
        name: customer?.name ?? '',
        phone: customer?.phone ?? '',
        address: customer?.address ?? '',
    });

    const handleSubmit = () => {
        if (purpose === 'create') {
            post(route('customer.store'));
        } else {
            put(route('customer.update', customer?.id));
        }
    };

    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="capitalize">{purpose} data customer</SheetTitle>
                </SheetHeader>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" />
                <Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="Phone number" />
                <Input value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="address" />

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

export default CustomerFormSheet;
