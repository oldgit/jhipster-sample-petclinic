import { ISpecialty } from 'app/shared/model/specialty.model';

export interface IVet {
  id?: number;
  firstName?: string;
  lastName?: string;
  specialities?: ISpecialty[];
}

export const defaultValue: Readonly<IVet> = {};
