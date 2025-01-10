import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/shared/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () =>
            import('./modules/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'subjects',
        component: LayoutComponent,
        loadChildren: () =>
            import('./modules/subjects/subjects.module').then((m) => m.SubjectsModule),
    },
    {
        path: 'students',
        component: LayoutComponent,
        loadChildren: () =>
            import('./modules/students/students.module').then((m) => m.StudentsModule),
    },
    {
        path: 'exams',
        component: LayoutComponent,
        loadChildren: () =>
            import('./modules/exams/exams.module').then((m) => m.ExamsModule),
    },
];
