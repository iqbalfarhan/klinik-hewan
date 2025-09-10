import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Pet } from '@/types/pet';
import { FC } from 'react';

type Props = {
  pet: Pet;
};

const ShowPet: FC<Props> = ({ pet }) => {
  return (
    <AppLayout title="Detail Pet" description="Detail pet">
      <Card>
        <CardHeader>
          <CardTitle>{ pet.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowPet;
