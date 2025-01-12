import { ResolveFn, Router } from '@angular/router';
import { SubjectService } from '../services/subject.service';
import { inject } from '@angular/core';
import { ISubject } from '../interfaces/subject.interface';
import { catchError, of } from 'rxjs';

export const subjectResolver: ResolveFn<ISubject | null> = (route, state, service: SubjectService = inject(SubjectService), router: Router = inject(Router)) => {
  const id: number = route.params['id'];
  return service.getSubject(id).pipe(
      catchError((error) => {
        if (error.status === 404) {
          router.navigate(['/', '**']);
        }
        return of(null);
      })
    );
};
