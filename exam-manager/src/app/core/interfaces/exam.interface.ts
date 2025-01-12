import { IAbstract } from "./abstract.interface";

export interface IExam extends IAbstract {
    subjectCode: string;  
    studentNumber: number;   
    examDate: Date;      
    score: number;        
}