import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from '../interfaces/exam.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends ApiService {

  constructor(private httpClient: HttpClient) { 
    super(httpClient, "Exams")
  }

  getAllExams(): Observable<IExam[]>{
    return this.get<IExam[]>();
  }

  getExam(id: number): Observable<IExam> {
    return this.getById<IExam>(id);
  }

  addExam(data: any):Observable<any>{
    return this.post<any>(data)
  }

  updateExam(id: number,data:any):Observable<any>{
    return this.put<any>(id,data)
  }

  removeExam(id: number): Observable<any> {
    return this.delete(id);
  }
}