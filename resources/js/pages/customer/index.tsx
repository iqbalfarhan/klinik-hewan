import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Customer } from '@/types/customer';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import CustomerBulkDeleteDialog from './components/customer-bulk-delete-dialog';
import CustomerBulkEditSheet from './components/customer-bulk-edit-sheet';
import CustomerDeleteDialog from './components/customer-delete-dialog';
import CustomerFilterSheet from './components/customer-filter-sheet';
import CustomerFormSheet from './components/customer-form-sheet';

type Props = {
  customers: Customer[];
  query: { [key: string]: string };
};

const CustomerList: FC<Props> = ({ customers, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Customers"
      description="Manage your customers"
      actions={
        <>
          {permissions?.canAdd && (
            <CustomerFormSheet purpose="create">
              <Button>
                <Plus />
                Create new customer
              </Button>
            </CustomerFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search customers..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <CustomerFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </CustomerFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <CustomerBulkEditSheet customerIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </CustomerBulkEditSheet>
            <CustomerBulkDeleteDialog customerIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </CustomerBulkDeleteDialog>
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
                    checked={ids.length === customers.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(customers.map((customer) => customer.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers
            .filter((customer) => JSON.stringify(customer).toLowerCase().includes(cari.toLowerCase()))
            .map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(customer.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, customer.id]);
                          } else {
                            setIds(ids.filter((id) => id !== customer.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('customer.show', customer.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      <CustomerFormSheet purpose="edit" customer={customer}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </CustomerFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <CustomerDeleteDialog customer={customer}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </CustomerDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default CustomerList;
