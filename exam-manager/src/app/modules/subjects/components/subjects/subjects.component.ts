import { Component } from '@angular/core';
import { PageHeadComponent } from '../../../shared/components/page-head/page-head.component';
import { ISubject } from '../../../../core/interfaces/subject.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { UnsubscriableBaseDirective } from '../../../../core/directives/unsubscriable-base.directive';
import { SubjectService } from '../../../../core/services/subject.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [PageHeadComponent, MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent extends UnsubscriableBaseDirective {

  subjects: ISubject[] = [];
  displayedColumns: string[] = ['code', 'name', 'grade', 'teacherName', 'actions'];

  constructor(private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private toastService: ToastrService
  ) {
    super()
    this.initializeData()
  }


  initializeData(): void {
    this.subjects = this.activatedRoute.snapshot.data["subjects"]
  }

  remove(id: number) {
    this.subjectService.removeSubject(id).pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => {
        this.toastService.success("Məlumat müvəffəqiyyətlə silindi.");
        this.loadList();
      })
  }

  loadList(): void {
    this.subjectService.getAllSubjects().pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.subjects = res
      })
  }
}
