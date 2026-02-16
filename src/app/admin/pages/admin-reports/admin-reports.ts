import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../components/button/button';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './admin-reports.html',
})
export class AdminReportsComponent {}
