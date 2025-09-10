import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Medical } from '@/types/medical';
import { FC } from 'react';

type Props = {
  medical: Medical;
};

const ShowMedical: FC<Props> = ({ medical }) => {
  return (
    <AppLayout title="Detail Medical" description="Detail medical">
      <Card>
        <CardHeader>
          <CardTitle>{ medical.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowMedical;
