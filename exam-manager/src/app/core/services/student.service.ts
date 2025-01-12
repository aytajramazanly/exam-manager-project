import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../interfaces/student.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends ApiService {

  constructor(private httpClient: HttpClient) { 
    super(httpClient, "Students")
  }

  getAllStudents(): Observable<IStudent[]>{
    return this.get<IStudent[]>();
  }

  getStudent(id: number): Observable<IStudent> {
    return this.getById<IStudent>(id);
  }

  addStudent(data: any):Observable<any>{
    return this.post<any>(data)
  }

  updateStudent(id: number,data:any):Observable<any>{
    return this.put<any>(id,data)
  }

  removeStudent(id: number): Observable<any> {
    return this.delete(id);
  }
}