import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PageHeadComponent } from '../../../shared/components/page-head/page-head.component';
import { IStudent } from '../../../../core/interfaces/student.interface';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [PageHeadComponent, MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  students: IStudent[] = [];
  displayedColumns: string[] = ['number','firstname','lastname','grade', 'actions'];

  constructor(private activatedRoute: ActivatedRoute) {
    this.initializeData()
  }

  initializeData(): void {
    this.students = this.activatedRoute.snapshot.data["students"]
  }
}
