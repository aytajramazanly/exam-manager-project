import { ResolveFn } from '@angular/router';
import { SubjectService } from '../services/subject.service';
import { inject } from '@angular/core';
import { ISubject } from '../interfaces/subject.interface';

export const subjectResolver: ResolveFn<ISubject> = (route, state, service: SubjectService = inject(SubjectService)) => {
  const id:number = route.params['id'];
  return service.getSubject(id);
};
