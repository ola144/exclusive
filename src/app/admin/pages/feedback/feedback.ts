import { Component, inject, OnInit } from '@angular/core';
import { Master } from '../../../services/master';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback implements OnInit {
  masterServ: Master = inject(Master);

  ngOnInit(): void {
    this.masterServ.getMessages();
  }
}
