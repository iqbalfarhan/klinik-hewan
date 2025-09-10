import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { Medical } from '@/types/medical';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import MedicalBulkDeleteDialog from './components/medical-bulk-delete-dialog';
import MedicalBulkEditSheet from './components/medical-bulk-edit-sheet';
import MedicalDeleteDialog from './components/medical-delete-dialog';
import MedicalFilterSheet from './components/medical-filter-sheet';
import MedicalFormSheet from './components/medical-form-sheet';

type Props = {
  medicals: Medical[];
  query: { [key: string]: string };
};

const MedicalList: FC<Props> = ({ medicals, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Medicals"
      description="Manage your medicals"
      actions={
        <>
          {permissions?.canAdd && (
            <MedicalFormSheet purpose="create">
              <Button>
                <Plus />
                Create new medical
              </Button>
            </MedicalFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search medicals..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <MedicalFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </MedicalFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <MedicalBulkEditSheet medicalIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </MedicalBulkEditSheet>
            <MedicalBulkDeleteDialog medicalIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </MedicalBulkDeleteDialog>
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
                    checked={ids.length === medicals.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(medicals.map((medical) => medical.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Pemilik</TableHead>
            <TableHead>Nama hewan</TableHead>
            <TableHead>Petugas</TableHead>
            <TableHead>Diagnosa</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicals
            .filter((medical) => JSON.stringify(medical).toLowerCase().includes(cari.toLowerCase()))
            .map((medical) => (
              <TableRow key={medical.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(medical.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, medical.id]);
                          } else {
                            setIds(ids.filter((id) => id !== medical.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{medical.pet.customer.name}</TableCell>
                <TableCell>
                  {medical.pet.name} si-{medical.pet.category.name}
                </TableCell>
                <TableCell>{medical.user.name}</TableCell>
                <TableCell>
                  <p className="text-wrap">{medical.diagnose}</p>
                </TableCell>
                <TableCell>{formatRupiah(medical.price)}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('medical.show', medical.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      <MedicalFormSheet purpose="edit" medical={medical}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </MedicalFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <MedicalDeleteDialog medical={medical}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </MedicalDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default MedicalList;
