import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Category } from '@/types';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
    category?: Category;
    purpose: 'create' | 'edit';
};

const CategoryFormSheet: FC<Props> = ({ children, purpose, category }) => {
    const { data, setData, post, put } = useForm({
        name: category?.name ?? '',
    });

    const handleSubmit = () => {
        if (purpose === 'create') {
            post(route('category.store'));
        } else {
            put(route('category.update', category?.id));
        }
    };

    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="capitalize">{purpose} data category</SheetTitle>
                </SheetHeader>
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

export default CategoryFormSheet;
