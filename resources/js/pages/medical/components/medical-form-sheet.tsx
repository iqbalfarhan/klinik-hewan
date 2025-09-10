import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Medical } from '@/types/medical';
import { Pet } from '@/types/pet';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  medical?: Medical;
  purpose: FormPurpose;
};

const MedicalFormSheet: FC<Props> = ({ children, medical, purpose }) => {
  const [open, setOpen] = useState(false);

  const { pets = [] } = usePage<{ pets: Pet[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    pet_id: medical?.pet_id ?? '',
    diagnose: medical?.diagnose ?? '',
    price: medical?.price ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('medical.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Medical created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('medical.update', medical?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Medical updated successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data medical</SheetTitle>
          <SheetDescription>Form untuk {purpose} data medical</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama hewan peliharaan">
              <Select value={data.pet_id?.toString()} onValueChange={(value) => setData('pet_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih hewan peliharaan" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id.toString()}>
                      {pet.name} <span>{pet.category.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Harga jasa">
              <Input type="text" placeholder="Name" value={data.price} onChange={(e) => setData('price', e.target.value)} />
            </FormControl>
            <FormControl label="Diagnosa">
              <Textarea placeholder="Name" value={data.diagnose} onChange={(e) => setData('diagnose', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} medical`} loading={processing} disabled={processing} />
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

export default MedicalFormSheet;
