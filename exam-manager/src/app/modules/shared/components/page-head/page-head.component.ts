import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-head',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './page-head.component.html',
  styleUrl: './page-head.component.scss'
})
export class PageHeadComponent {
  @Input() title: string = "";
  @Input() createRoute: string | undefined;
  @Input() backRoute: string[]  | undefined;
}
