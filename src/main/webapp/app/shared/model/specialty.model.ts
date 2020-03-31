import { IVet } from 'app/shared/model/vet.model';

export interface ISpecialty {
  id?: number;
  name?: string;
  vets?: IVet[];
}

export const defaultValue: Readonly<ISpecialty> = {};
