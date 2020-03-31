import { Moment } from 'moment';
import { IPet } from 'app/shared/model/pet.model';

export interface IVisit {
  id?: number;
  date?: Moment;
  description?: string;
  pet?: IPet;
}

export const defaultValue: Readonly<IVisit> = {};
