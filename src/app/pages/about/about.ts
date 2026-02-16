import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TinySliderInstance, tns } from 'tiny-slider';
import { HomeAdvantage } from '../../components/home-advantage/home-advantage';
import { Master } from '../../services/master';

@Component({
  selector: 'app-about',
  imports: [CommonModule, HomeAdvantage],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  @ViewChild('slider', { static: true }) slider!: ElementRef;

  masterService: Master = inject(Master);
  router: Router = inject(Router);

  sliderInstance!: TinySliderInstance;

  testaments = signal<any[]>([
    {
      id: 1,
      icon: 'fa fa-archive',
      numbers: 10.5,
      desc: 'Sallers active our site',
    },
    {
      id: 2,
      icon: 'fa fa-dollar',
      numbers: 33,
      desc: 'Mopnthly Produduct Sale',
    },
    {
      id: 3,
      icon: 'fa fa-briefcase',
      numbers: 45,
      desc: 'Customer active in our site',
    },
    {
      id: 4,
      icon: 'fa fa-money',
      numbers: 25,
      desc: 'Anual gross sale in our site',
    },
  ]);

  teams = signal<ITeam[]>([
    {
      name: 'Tom Cruise',
      role: 'Founder & Chairman',
      img: 'images/tom.png',
    },
    {
      name: 'Emma Watson',
      role: 'Managing Director',
      img: 'images/emma.png',
    },
    {
      name: 'Will Smith',
      role: 'Product Designer',
      img: 'images/will.png',
    },
    {
      name: 'Tom Cruise',
      role: 'Founder & Chairman',
      img: 'images/tom.png',
    },
    {
      name: 'Emma Watson',
      role: 'Managing Director',
      img: 'images/emma.png',
    },
    {
      name: 'Will Smith',
      role: 'Product Designer',
      img: 'images/will.png',
    },
  ]);

  ngAfterViewInit(): void {
    this.sliderInstance = tns({
      container: this.slider.nativeElement,
      items: 3,
      gutter: 10,
      slideBy: 1,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayButtonOutput: false,

      controls: true, // arrows

      nav: true, // 👈 pagination dots
      navPosition: 'bottom',

      mouseDrag: true,
      touch: true,

      loop: true,

      responsive: {
        0: { items: 1 },
        640: { items: 2 },
        1024: { items: 3 },
      },
    });
  }

  pauseSlider() {
    this.sliderInstance?.pause();
  }

  playSlider() {
    this.sliderInstance?.play();
  }

  onNavigateHome(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}

interface ITeam {
  name: string;
  role: string;
  img: string;
}
