import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Pet } from '@/types/pet';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import PetBulkDeleteDialog from './components/pet-bulk-delete-dialog';
import PetBulkEditSheet from './components/pet-bulk-edit-sheet';
import PetDeleteDialog from './components/pet-delete-dialog';
import PetFilterSheet from './components/pet-filter-sheet';
import PetFormSheet from './components/pet-form-sheet';

type Props = {
  pets: Pet[];
  query: { [key: string]: string };
};

const PetList: FC<Props> = ({ pets, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Pets"
      description="Manage your pets"
      actions={
        <>
          {permissions?.canAdd && (
            <PetFormSheet purpose="create">
              <Button>
                <Plus />
                Create new pet
              </Button>
            </PetFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search pets..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <PetFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </PetFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <PetBulkEditSheet petIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </PetBulkEditSheet>
            <PetBulkDeleteDialog petIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </PetBulkDeleteDialog>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === pets.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(pets.map((pet) => pet.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Kategory</TableHead>
            <TableHead>Pemilik</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pets
            .filter((pet) => JSON.stringify(pet).toLowerCase().includes(cari.toLowerCase()))
            .map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(pet.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, pet.id]);
                          } else {
                            setIds(ids.filter((id) => id !== pet.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{pet.category.name}</TableCell>
                <TableCell>{pet.customer.name}</TableCell>
                <TableCell>{pet.name}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('pet.show', pet.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      <PetFormSheet purpose="edit" pet={pet}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </PetFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <PetDeleteDialog pet={pet}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </PetDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default PetList;
