import { IAbstract } from "./abstract.interface";

export interface IStudent extends IAbstract{
  number: number;
  firstName: string;   
  lastName: string;    
  grade: number;      
}
  