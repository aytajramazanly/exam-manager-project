import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PageHeadComponent } from '../../../shared/components/page-head/page-head.component';
import { IExam } from '../../../../core/interfaces/exam.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-exams',
  standalone: true,
   imports: [PageHeadComponent, MatTableModule, MatIconModule, MatButtonModule, RouterModule, DatePipe],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {
  exams: IExam[] = [];
  displayedColumns: string[] = ['subjectCode','studentNumber','examDate','score', 'actions'];

  constructor(private activatedRoute: ActivatedRoute) {
    this.initializeData()
  }

  initializeData(): void {
    this.exams = this.activatedRoute.snapshot.data["exams"]
  }
}
