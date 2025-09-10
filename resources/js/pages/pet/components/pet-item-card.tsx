import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Pet } from '@/types/pet';
import { Link } from '@inertiajs/react';
import PetFormSheet from './pet-form-sheet';
import PetDeleteDialog from './pet-delete-dialog';

type Props = {
  pet: Pet;
};

const PetItemCard: FC<Props> = ({ pet }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ pet.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { pet.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('pet.show', pet.id)}>
            <Folder />
          </Link>
        </Button>
        <PetFormSheet purpose="edit" pet={ pet }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </PetFormSheet>
        <PetDeleteDialog pet={ pet }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </PetDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default PetItemCard;
