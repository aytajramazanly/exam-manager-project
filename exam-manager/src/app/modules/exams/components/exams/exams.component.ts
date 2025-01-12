import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PageHeadComponent } from '../../../shared/components/page-head/page-head.component';
import { IExam } from '../../../../core/interfaces/exam.interface';
import { DatePipe } from '@angular/common';
import { UnsubscriableBaseDirective } from '../../../../core/directives/unsubscriable-base.directive';
import { ExamService } from '../../../../core/services/exam.service';
import { takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [PageHeadComponent, MatTableModule, MatIconModule, MatButtonModule, RouterModule, DatePipe],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent extends UnsubscriableBaseDirective {
  exams: IExam[] = [];
  displayedColumns: string[] = ['subjectCode', 'studentNumber', 'examDate', 'score', 'actions'];

  constructor(private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private toastService: ToastrService
  ) {
    super()
    this.initializeData()
  }

  initializeData(): void {
    this.exams = this.activatedRoute.snapshot.data["exams"]
  }

  remove(id: number) {
    this.examService.removeExam(id).pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => {
        this.toastService.success("Məlumat müvəffəqiyyətlə silindi.");
        this.loadList();
      })
  }

  loadList(): void {
    this.examService.getAllExams().pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.exams = res
      })
  }
}
