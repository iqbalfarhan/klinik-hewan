import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Customer } from '@/types/customer';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  customerIds: Customer['id'][];
};

const CustomerBulkEditSheet: FC<Props> = ({ children, customerIds }) => {
  const { data, put } = useForm({
    customer_ids: customerIds,
  });

  const handleSubmit = () => {
    put(route('customer.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Customer updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah customer</SheetTitle>
          <SheetDescription>Ubah data {data.customer_ids.length} customer</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan customer
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CustomerBulkEditSheet;
