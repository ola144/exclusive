import { Component, inject } from '@angular/core';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-not-found-page',
  imports: [Button],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
})
export class NotFoundPage {
  masterService: Master = inject(Master);
  router: Router = inject(Router);

  onNavigateHome(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
