import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
    user?: User;
    purpose: 'create' | 'edit';
};

const UserFormSheet: FC<Props> = ({ children, purpose, user }) => {
    const { data, setData, post, put } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
    });

    const handleSubmit = () => {
        if (purpose === 'create') {
            post(route('user.store'));
        } else {
            put(route('user.update', user?.id));
        }
    };

    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="capitalize">{purpose} data user</SheetTitle>
                </SheetHeader>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" />
                <Input value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email" />
                <Input value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Password" />

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

export default UserFormSheet;
