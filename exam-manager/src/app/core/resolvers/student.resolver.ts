import { ResolveFn, Router } from '@angular/router';
import { IStudent } from '../interfaces/student.interface';
import { StudentService } from '../services/student.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';

export const studentResolver: ResolveFn<IStudent | null> = (route, state, service: StudentService = inject(StudentService), router: Router = inject(Router)) => {
  const id: number = route.params['id'];
  return service.getStudent(id).pipe(
      catchError((error) => {
        if (error.status === 404) {
          router.navigate(['/', '**']);
        }
        return of(null);
      })
    );
};
