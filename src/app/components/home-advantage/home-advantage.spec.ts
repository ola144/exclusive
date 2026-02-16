import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdvantage } from './home-advantage';

describe('HomeAdvantage', () => {
  let component: HomeAdvantage;
  let fixture: ComponentFixture<HomeAdvantage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAdvantage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdvantage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
