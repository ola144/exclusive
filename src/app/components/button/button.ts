import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [CommonModule, RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() text: string = '';
  @Input() type: string = '';
  @Input() size: string = '';
  @Input() routerLink: any = null;
  @Input() loading: boolean = false;
  @Input() disabled: boolean | null = false;
  @Output() handleOnlick: EventEmitter<any> = new EventEmitter<any>();
}
