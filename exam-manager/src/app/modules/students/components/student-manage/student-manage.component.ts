import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, takeUntil } from 'rxjs';
import { UnsubscriableBaseDirective } from '../../../../core/directives/unsubscriable-base.directive';
import { DataManageModes } from '../../../../core/enums/manage-mode.enum';
import { ICreateStudent } from '../../../../core/interfaces/create-student.interface';
import { IStudent } from '../../../../core/interfaces/student.interface';
import { ManageModeService } from '../../../../core/services/manage-mode.service';
import { StudentService } from '../../../../core/services/student.service';
import { FormModel } from '../../../../core/utils/form.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PageHeadComponent } from '../../../shared/components/page-head/page-head.component';

@Component({
  selector: 'app-student-manage',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, PageHeadComponent],
  templateUrl: './student-manage.component.html',
  styleUrl: './student-manage.component.scss'
})
export class StudentManageComponent extends UnsubscriableBaseDirective implements OnInit {
  manageMode: DataManageModes | undefined;
  student: IStudent | undefined;
  itemForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private manageModeService: ManageModeService,
    private studentService: StudentService,
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
    this.student = this.activatedRoute.snapshot.data['student'];
  }

  private createForm(mode: DataManageModes | undefined): FormGroup {
    if (mode === DataManageModes.Create) {
      return this.createDataFormGroup();
    } else  {
      return this.updateDataFormGroup(this.student);
    }
  }

 private createDataFormGroup(): FormGroup {
    const itemForm: FormModel<ICreateStudent> = {
      firstName: [null, [Validators.required, Validators.maxLength(30)]],
      lastName: [null, [Validators.required, Validators.maxLength(30)]],
      grade: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\d{1,2}$/),
          Validators.min(1),
          Validators.max(99),
        ],
      ],
      number: [null, [
        Validators.required,
        Validators.pattern(/^\d{1,5}$/),
        Validators.min(1),
        Validators.max(99),
      ],]
    };
    return this.formBuilder.group(itemForm);
  }

  private updateDataFormGroup(student: IStudent | undefined): FormGroup {
    const itemForm: FormModel<IStudent> = {
      id:[student?.id],
      firstName: [student?.firstName, [Validators.required, Validators.maxLength(30)]],
      lastName: [student?.lastName, [Validators.required, Validators.maxLength(30)]],
      grade: [
        student?.grade,
        [
          Validators.required,
          Validators.pattern(/^\d{1,2}$/),
          Validators.min(1),
          Validators.max(99),
        ],
      ],
      number: [student?.number, [
        Validators.required,
        Validators.pattern(/^\d{1,5}$/),
        Validators.min(1),
        Validators.max(99),
      ],]
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
    let result$: Observable<IStudent> | undefined;

    if (this.manageMode === DataManageModes.Edit) {
      result$ = this.update$();
    } else if (this.manageMode === DataManageModes.Create) {
      result$ = this.create$();
    }

    result$?.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.showSuccessMessage();
      this.router.navigate(['/', 'students']);
    });
  }

  private update$(): Observable<IStudent> {
    const update: IStudent = this.itemForm.value;
    return this.studentService.updateStudent(this.student!.id, update);
  }

  private create$(): Observable<IStudent> {
    const create: ICreateStudent = this.itemForm.value;
    return this.studentService.addStudent(create);
  }

  private showSuccessMessage(): void {
    const message = this.manageMode === DataManageModes.Create
      ? 'Xidmət məlumatları müvəffəqiyyətlə əlavə edildi!'
      : 'Xidmət məlumatları müvəffəqiyyətlə yeniləndi!';
    this.toastService.success(message, undefined, { timeOut: 3000 });
  }
}
