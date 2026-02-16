import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { TopNav } from '../top-nav/top-nav';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Navbar, Footer, TopNav],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
