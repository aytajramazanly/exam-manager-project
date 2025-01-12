import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManageModes } from '../../../../core/enums/manage-mode.enum';
import { ManageModeService } from '../../../../core/services/manage-mode.service';
import { ISubject } from '../../../../core/interfaces/subject.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormModel } from '../../../../core/utils/form.model';
import { ICreateSubject } from '../../../../core/interfaces/create-subject.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Observable, takeUntil } from 'rxjs';
import { SubjectService } from '../../../../core/services/subject.service';
import { UnsubscriableBaseDirective } from '../../../../core/directives/unsubscriable-base.directive';
import { PageHeadComponent } from '../../../shared/components/page-head/page-head.component';

@Component({
  selector: 'app-subject-manage',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, PageHeadComponent],
  templateUrl: './subject-manage.component.html',
  styleUrl: './subject-manage.component.scss'
})
export class SubjectManageComponent extends UnsubscriableBaseDirective implements OnInit {
  manageMode: DataManageModes | undefined;
  subject: ISubject | undefined;
  itemForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private manageModeService: ManageModeService,
    private subjectService: SubjectService,
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
    this.subject = this.activatedRoute.snapshot.data['subject'];
  }

  private createForm(mode: DataManageModes | undefined): FormGroup {
    if (mode === DataManageModes.Create) {
      return this.createDataFormGroup();
    } else {
      return this.updateDataFormGroup(this.subject);
    }
  }

  private createDataFormGroup(): FormGroup {
    const itemForm: FormModel<ICreateSubject> = {
      code: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      grade: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\d{1,2}$/),
          Validators.min(1),
          Validators.max(99),
        ],
      ],
      teacherFirstName: [null, [Validators.required, Validators.maxLength(20)]],
      teacherLastName: [null, [Validators.required, Validators.maxLength(20)]],
    };
    return this.formBuilder.group(itemForm);
  }

  private updateDataFormGroup(subject: ISubject | undefined): FormGroup {
    const itemForm: FormModel<ISubject> = {
      id: [subject?.id],
      code: [subject?.code, [Validators.required, Validators.maxLength(3)]],
      name: [subject?.name, [Validators.required, Validators.maxLength(30)]],
      grade: [
        subject?.grade,
        [
          Validators.required,
          Validators.pattern(/^\d{1,2}$/),
          Validators.min(1),
          Validators.max(99),
        ],
      ],
      teacherFirstName: [subject?.teacherFirstName, [Validators.required, Validators.maxLength(20)]],
      teacherLastName: [subject?.teacherLastName, [Validators.required, Validators.maxLength(20)]],
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
    let result$: Observable<ISubject> | undefined;

    if (this.manageMode === DataManageModes.Edit) {
      result$ = this.update$();
    } else if (this.manageMode === DataManageModes.Create) {
      result$ = this.create$();
    }

    result$?.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.showSuccessMessage();
      this.router.navigate(['/', 'subjects']);
    });
  }

  private update$(): Observable<ISubject> {
    const update: ISubject = this.itemForm.value;
    return this.subjectService.updateSubject(this.subject!.id, update);
  }

  private create$(): Observable<ISubject> {
    const create: ICreateSubject = this.itemForm.value;
    return this.subjectService.addSubject(create);
  }

  private showSuccessMessage(): void {
    const message = this.manageMode === DataManageModes.Create
      ? 'Xidmət məlumatları müvəffəqiyyətlə əlavə edildi!'
      : 'Xidmət məlumatları müvəffəqiyyətlə yeniləndi!';
    this.toastService.success(message, undefined, { timeOut: 3000 });
  }
}

