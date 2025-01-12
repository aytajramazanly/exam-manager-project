import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { studentsResolver } from '../../core/resolvers/students.resolver';
import { StudentManageComponent } from './components/student-manage/student-manage.component';
import { studentResolver } from '../../core/resolvers/student.resolver';

const routes: Routes = [
  { path:'', 
      component:StudentsComponent,
      resolve: {
        students: studentsResolver
      }
    },
    {
      path:'edit/:id',
      component:StudentManageComponent,
      resolve: {
        student: studentResolver
      }
    },
    {
      path:'view/:id',
      component:StudentManageComponent,
      resolve: {
        student: studentResolver
      }
    },
    {
      path:'create',
      component:StudentManageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
