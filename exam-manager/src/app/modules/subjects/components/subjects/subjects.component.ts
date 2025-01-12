import { Component } from '@angular/core';
import { PageHeadComponent } from '../../../shared/components/page-head/page-head.component';
import { ISubject } from '../../../../core/interfaces/subject.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [PageHeadComponent, MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent {

  subjects: ISubject[] = [];
  displayedColumns: string[] = ['code','name','grade', 'teacherName', 'actions'];

  constructor(private activatedRoute: ActivatedRoute) {
    this.initializeData()
  }

  initializeData(): void {
    this.subjects = this.activatedRoute.snapshot.data["subjects"]
  }
}
