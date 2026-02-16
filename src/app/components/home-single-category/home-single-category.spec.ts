import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSingleCategory } from './home-single-category';

describe('HomeSingleCategory', () => {
  let component: HomeSingleCategory;
  let fixture: ComponentFixture<HomeSingleCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSingleCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSingleCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
