import { ResolveFn } from '@angular/router';
import { IStudent } from '../interfaces/student.interface';
import { StudentService } from '../services/student.service';
import { inject } from '@angular/core';

export const studentResolver: ResolveFn<IStudent> = (route, state, service: StudentService = inject(StudentService)) => {
  const id: number = route.params['id'];
  return service.getStudent(id);
};
