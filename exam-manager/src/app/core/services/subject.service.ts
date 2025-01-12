import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ISubject } from '../interfaces/subject.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends ApiService {

  constructor(private httpClient: HttpClient) { 
    super(httpClient, "Subjects")
  }

  getAllSubjects(): Observable<ISubject[]>{
    return this.get<ISubject[]>();
  }

  getSubject(id: number): Observable<ISubject> {
    return this.getById<ISubject>(id);
  }

  addSubject(data: any):Observable<any>{
    return this.post<any>(data)
  }

  updateSubject(id: number,data:any):Observable<any>{
    return this.put<any>(id,data)
  }

  removeCSubject(id: number): Observable<any> {
    return this.delete(id);
  }
}
