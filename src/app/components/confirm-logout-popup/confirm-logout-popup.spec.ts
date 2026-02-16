import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLogoutPopup } from './confirm-logout-popup';

describe('ConfirmLogoutPopup', () => {
  let component: ConfirmLogoutPopup;
  let fixture: ComponentFixture<ConfirmLogoutPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmLogoutPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmLogoutPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
