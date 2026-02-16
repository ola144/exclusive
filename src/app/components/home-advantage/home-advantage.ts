import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home-advantage',
  imports: [],
  templateUrl: './home-advantage.html',
  styleUrl: './home-advantage.css',
})
export class HomeAdvantage {
  advantages = signal<any[]>([
    {
      icon: 'https://img.icons8.com/laces/64/bus.png',
      title: 'free and fast delivery',
      desc: 'Free delievery for all orders over $140',
    },
    {
      icon: 'https://img.icons8.com/dotty/80/headphones.png',
      title: '24/7 customer service',
      desc: 'Friendly 24/7 customer support',
    },
    {
      icon: 'https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/external-money-flow-money-smashingstocks-hand-drawn-black-smashing-stocks-3.png',
      title: 'money back guarantee',
      desc: 'We return money within 30 days',
    },
  ]);
}
