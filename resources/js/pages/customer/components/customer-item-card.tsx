import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Customer } from '@/types/customer';
import { Link } from '@inertiajs/react';
import CustomerFormSheet from './customer-form-sheet';
import CustomerDeleteDialog from './customer-delete-dialog';

type Props = {
  customer: Customer;
};

const CustomerItemCard: FC<Props> = ({ customer }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ customer.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { customer.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('customer.show', customer.id)}>
            <Folder />
          </Link>
        </Button>
        <CustomerFormSheet purpose="edit" customer={ customer }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </CustomerFormSheet>
        <CustomerDeleteDialog customer={ customer }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </CustomerDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default CustomerItemCard;
