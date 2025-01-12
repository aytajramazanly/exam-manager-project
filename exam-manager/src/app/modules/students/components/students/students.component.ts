import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PageHeadComponent } from '../../../shared/components/page-head/page-head.component';
import { IStudent } from '../../../../core/interfaces/student.interface';
import { StudentService } from '../../../../core/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { UnsubscriableBaseDirective } from '../../../../core/directives/unsubscriable-base.directive';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [PageHeadComponent, MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent extends UnsubscriableBaseDirective {
  students: IStudent[] = [];
  displayedColumns: string[] = ['number', 'firstname', 'lastname', 'grade', 'actions'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private toastService: ToastrService
  ) {
    super();
    this.initializeData()
  }

  initializeData(): void {
    this.students = this.activatedRoute.snapshot.data["students"]
  }

  remove(id: number) {
    this.studentService.removeStudent(id).pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => {
        this.toastService.success("Məlumat müvəffəqiyyətlə silindi.");
        this.loadList();
      })
  }

  loadList(): void {
    this.studentService.getAllStudents().pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.students = res
      })
  }
}
