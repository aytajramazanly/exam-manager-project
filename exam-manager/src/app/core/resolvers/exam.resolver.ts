import { ResolveFn, Router } from '@angular/router';
import { ExamService } from '../services/exam.service';
import { inject } from '@angular/core';
import { IExam } from '../interfaces/exam.interface';
import { catchError, of } from 'rxjs';

export const examResolver: ResolveFn<IExam | null> = (route, state, service: ExamService = inject(ExamService), router: Router = inject(Router)) => {
  const id: number = route.params['id'];
  return service.getExam(id).pipe(
    catchError((error) => {
      if (error.status === 404) {
        router.navigate(['/', '**']);
      }
      return of(null);
    })
  );
};
