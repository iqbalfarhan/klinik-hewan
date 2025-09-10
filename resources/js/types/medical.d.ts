import { User } from '.';
import { Pet } from './pet';

export type Medical = {
  id: number;
  pet_id: Pet['id'];
  pet: Pet;
  diagnose: string;
  price: number;
  user_id: User['id'];
  user: User;
  created_at: string;
  updated_at: string;
};
