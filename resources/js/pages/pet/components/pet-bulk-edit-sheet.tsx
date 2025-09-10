import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Pet } from '@/types/pet';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  petIds: Pet['id'][];
};

const PetBulkEditSheet: FC<Props> = ({ children, petIds }) => {
  const { data, put } = useForm({
    pet_ids: petIds,
  });

  const handleSubmit = () => {
    put(route('pet.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Pet updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah pet</SheetTitle>
          <SheetDescription>Ubah data {data.pet_ids.length} pet</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan pet
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

export default PetBulkEditSheet;
