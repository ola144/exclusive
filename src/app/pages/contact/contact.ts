import { Component, inject } from '@angular/core';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-contact',
  imports: [Button],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  masterService: Master = inject(Master);
  router: Router = inject(Router);

  onNavigateHome(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
