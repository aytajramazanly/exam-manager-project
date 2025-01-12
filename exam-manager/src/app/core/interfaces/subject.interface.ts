import { IAbstract } from "./abstract.interface";

export interface ISubject extends IAbstract{
    code: string; 
    name: string; 
    grade: number; 
    teacherFirstName: string;  
    teacherLastName: string;  
  }