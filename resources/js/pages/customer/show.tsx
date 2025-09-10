import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Customer } from '@/types/customer';
import { FC } from 'react';

type Props = {
  customer: Customer;
};

const ShowCustomer: FC<Props> = ({ customer }) => {
  return (
    <AppLayout title="Detail Customer" description="Detail customer">
      <Card>
        <CardHeader>
          <CardTitle>{ customer.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowCustomer;
