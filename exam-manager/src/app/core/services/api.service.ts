import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export class ApiService {

  protected apiUrl = environment.apiUrl;
  private url = "";

  constructor(protected http: HttpClient, @Inject(String) protected controller: string) {
    this.url = `${this.apiUrl}/${controller}`;
  }

  getAll<T>(action: string = ""): Observable<T> {
    return this.http.get<T>(`${this.url}${this.getActionValue(action)}`);
  }

  getById<T>(id: number, action: string = ""): Observable<T> {
    return this.http.get<T>(`${this.url}${this.getActionValue(action)}/${id}`);
  }

  get<T>(action: string = ""): Observable<T> {
    return this.http.get<T>(`${this.url}${this.getActionValue(action)}`);
  }

  post<T>(item: Object, action: string = ""): Observable<T> {
    return this.http.post<T>(`${this.url}${this.getActionValue(action)}`, item);
  }

  put<T>(id: number, itemToUpdate: Object, action: string = ""): Observable<T> {
    return this.http.put<T>(`${this.url}${this.getActionValue(action)}/${id}`, itemToUpdate);
  }

  delete<T>(id: number, action: string = ""): Observable<T> {
    return this.http.delete<T>(`${this.url}${this.getActionValue(action)}/${id}`);
  }

  private getActionValue(action: string): string {
    return `${action ? "/" + action : ""}`;
  }

  getFormData(object: Object): FormData {
    const formData = new FormData;
    Object.keys(object).forEach(key => {
      const data = object[key as keyof object];
      if (Array.isArray(data)) {
        const newData = Array.from(data);
        newData.forEach(value =>
          formData.append(key + [], value as keyof object)
        );
      } else {
        formData.append(key, object[key as keyof object]);
      };
    });
    return formData;
  }
}
