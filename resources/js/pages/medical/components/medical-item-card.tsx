import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Medical } from '@/types/medical';
import { Link } from '@inertiajs/react';
import MedicalFormSheet from './medical-form-sheet';
import MedicalDeleteDialog from './medical-delete-dialog';

type Props = {
  medical: Medical;
};

const MedicalItemCard: FC<Props> = ({ medical }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ medical.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { medical.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('medical.show', medical.id)}>
            <Folder />
          </Link>
        </Button>
        <MedicalFormSheet purpose="edit" medical={ medical }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </MedicalFormSheet>
        <MedicalDeleteDialog medical={ medical }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </MedicalDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default MedicalItemCard;
