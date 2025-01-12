import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SubjectService } from '../services/subject.service';
import { ISubject } from '../interfaces/subject.interface';

export const subjectsResolver: ResolveFn<ISubject[]> =  (route, state, service: SubjectService = inject(SubjectService)) => {
  return service.getAllSubjects();
};
