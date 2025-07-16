import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { can } from '@/lib/utils';
import { SharedData, User } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
    user?: User;
    purpose: 'create' | 'edit';
};

const UserFormSheet: FC<Props> = ({ children, purpose, user }) => {
    const { permissions } = usePage<SharedData>().props.auth;
    const permits = permissions as string[];

    const { data, setData, post, put } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        // role: user?.role ?? '',
        password: '',
    });

    if (!can(permits, 'user.create') || !can(permits, 'user.edit')) {
        return null;
    }

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

                {/* <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                </Select> */}

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
