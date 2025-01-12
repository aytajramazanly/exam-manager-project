import { ResolveFn } from '@angular/router';
import { ExamService } from '../services/exam.service';
import { inject } from '@angular/core';
import { IExam } from '../interfaces/exam.interface';

export const examsResolver: ResolveFn<IExam[]> = (route, state, service: ExamService = inject(ExamService)) => {
  return service.getAllExams();
};
