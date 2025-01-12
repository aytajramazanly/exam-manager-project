import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectManageComponent } from './components/subject-manage/subject-manage.component';
import { subjectResolver } from '../../core/resolvers/subject.resolver';
import { subjectsResolver } from '../../core/resolvers/subjects.resolver';

const routes: Routes = [
  { path:'', 
    component:SubjectsComponent,
    resolve: {
      subjects: subjectsResolver
    }
  },
  {
    path:'edit/:id',
    component:SubjectManageComponent,
    resolve: {
      subject: subjectResolver
    }
  },
  {
    path:'view/:id',
    component:SubjectManageComponent,
    resolve: {
      subject: subjectResolver
    }
  },
  {
    path:'create',
    component:SubjectManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
