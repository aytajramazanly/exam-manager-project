import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsComponent } from './components/exams/exams.component';
import { examResolver } from '../../core/resolvers/exam.resolver';
import { examsResolver } from '../../core/resolvers/exams.resolver';
import { ExamManageComponent } from './components/exam-manage/exam-manage.component';
import { subjectsResolver } from '../../core/resolvers/subjects.resolver';
import { studentsResolver } from '../../core/resolvers/students.resolver';

const routes: Routes = [
  { path:'', 
      component:ExamsComponent,
      resolve: {
        exams: examsResolver
      }
    },
    {
      path:'edit/:id',
      component:ExamManageComponent,
      resolve: {
        exam: examResolver,
        subjects: subjectsResolver,
        students: studentsResolver
      }
    },
    {
      path:'view/:id',
      component:ExamManageComponent,
      resolve: {
        exam: examResolver,
        subjects: subjectsResolver,
        students: studentsResolver
      }
    },
    {
      path:'create',
      component:ExamManageComponent,
      resolve: {
        subjects: subjectsResolver,
        students: studentsResolver
      }
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
