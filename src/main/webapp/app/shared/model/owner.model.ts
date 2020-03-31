import { IPet } from 'app/shared/model/pet.model';

export interface IOwner {
  id?: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  telephone?: string;
  pets?: IPet[];
}

export const defaultValue: Readonly<IOwner> = {};
