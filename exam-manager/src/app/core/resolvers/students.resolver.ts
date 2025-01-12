import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IStudent } from '../interfaces/student.interface';
import { StudentService } from '../services/student.service';

export const studentsResolver: ResolveFn<IStudent[]> = (route, state, service: StudentService = inject(StudentService)) => {
  return service.getAllStudents();
};
