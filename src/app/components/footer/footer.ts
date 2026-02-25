import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminSettingService } from '../../admin/services/admin-setting.service';
import { Router, RouterLink } from '@angular/router';
import { Master } from '../../services/master';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  currentYear = signal<number>(new Date().getFullYear());

  settingService: AdminSettingService = inject(AdminSettingService);
  masterService: Master = inject(Master);
  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.settingService.getStoreDetails();
  }

  onNavigateToAccount(link: string) {
    this.router.navigateByUrl(link);
    this.masterService.setData({
      link: link,
    });
  }
}
