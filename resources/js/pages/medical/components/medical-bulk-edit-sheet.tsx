import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Medical } from '@/types/medical';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  medicalIds: Medical['id'][];
};

const MedicalBulkEditSheet: FC<Props> = ({ children, medicalIds }) => {
  const { data, put } = useForm({
    medical_ids: medicalIds,
  });

  const handleSubmit = () => {
    put(route('medical.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Medical updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah medical</SheetTitle>
          <SheetDescription>Ubah data {data.medical_ids.length} medical</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan medical
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

export default MedicalBulkEditSheet;
