import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PageHeadComponent } from '../../../shared/components/page-head/page-head.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, takeUntil } from 'rxjs';
import { UnsubscriableBaseDirective } from '../../../../core/directives/unsubscriable-base.directive';
import { DataManageModes } from '../../../../core/enums/manage-mode.enum';
import { ICreateExam } from '../../../../core/interfaces/create-exam.interface';
import { IExam } from '../../../../core/interfaces/exam.interface';
import { ExamService } from '../../../../core/services/exam.service';
import { ManageModeService } from '../../../../core/services/manage-mode.service';
import { FormModel } from '../../../../core/utils/form.model';
import { ISubject } from '../../../../core/interfaces/subject.interface';
import { IStudent } from '../../../../core/interfaces/student.interface';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-exam-manage',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, PageHeadComponent, MatDatepickerModule],
  templateUrl: './exam-manage.component.html',
  styleUrl: './exam-manage.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ExamManageComponent extends UnsubscriableBaseDirective implements OnInit {
  manageMode: DataManageModes | undefined;
  exam: IExam | undefined;
  itemForm!: FormGroup;
  subjects: ISubject[] = [];
  students: IStudent[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private manageModeService: ManageModeService,
    private examService: ExamService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private router: Router
  ) {
    super();
    this.manageMode = this.manageModeService.getManageMode(router.url);
    this.initializeData();
  }

  ngOnInit(): void {
    this.itemForm = this.createForm(this.manageMode);
    if (this.manageMode === DataManageModes.View) {
      this.itemForm.disable();
    }
  }

  private initializeData(): void {
    this.exam = this.activatedRoute.snapshot.data['exam'];
    this.subjects = this.activatedRoute.snapshot.data['subjects'];
    this.students = this.activatedRoute.snapshot.data['students'];
  }

  private createForm(mode: DataManageModes | undefined): FormGroup {
    if (mode === DataManageModes.Create) {
      return this.createDataFormGroup();
    } else {
      return this.updateDataFormGroup(this.exam);
    }
  }

  private createDataFormGroup(): FormGroup {
    const itemForm: FormModel<ICreateExam> = {
      subjectCode: [null, Validators.required],
      studentNumber: [null, Validators.required],
      examDate: [null, Validators.required],
      score: [null, [Validators.required, Validators.pattern(/^\d{1}$/)]]
    };
    return this.formBuilder.group(itemForm);
  }

  private updateDataFormGroup(exam: IExam | undefined): FormGroup {
    const itemForm: FormModel<IExam> = {
      id: [exam?.id],
      subjectCode: [exam?.subjectCode, Validators.required],
      studentNumber: [exam?.studentNumber, Validators.required],
      examDate: [exam?.examDate, Validators.required],
      score: [exam?.score, [Validators.required, Validators.pattern(/^\d{1}$/)]]
    };
    return this.formBuilder.group(itemForm);
  }

  onSubmit(): void {
    if (this.manageMode === DataManageModes.View) {
      this.toastService.error('Sadece məlumatlara baxa bilersiniz, dəyişiklik edə bilməzsiniz!');
      return;
    }

    if (!this.itemForm.valid) {
      this.toastService.error('Məlumatların düzgünlüyünü yoxlayın!');
      return;
    }

    this.handleSubmit();
  }

  private handleSubmit(): void {
    let result$: Observable<IExam> | undefined;

    if (this.manageMode === DataManageModes.Edit) {
      result$ = this.update$();
    } else if (this.manageMode === DataManageModes.Create) {
      result$ = this.create$();
    }

    result$?.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.showSuccessMessage();
      this.router.navigate(['/', 'exams']);
    });
  }

  private update$(): Observable<IExam> {
    const update: IExam = this.itemForm.value;
    return this.examService.updateExam(this.exam!.id, update);
  }

  private create$(): Observable<IExam> {
    const create: ICreateExam = this.itemForm.value;
    return this.examService.addExam(create);
  }

  private showSuccessMessage(): void {
    const message = this.manageMode === DataManageModes.Create
      ? 'Xidmət məlumatları müvəffəqiyyətlə əlavə edildi!'
      : 'Xidmət məlumatları müvəffəqiyyətlə yeniləndi!';
    this.toastService.success(message, undefined, { timeOut: 3000 });
  }
}
