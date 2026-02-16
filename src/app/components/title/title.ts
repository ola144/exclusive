import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
  styleUrl: './title.css',
})
export class Title {
  @Input() title1: string | null | undefined = '';
  @Input() title2: string | null | undefined = '';
}
