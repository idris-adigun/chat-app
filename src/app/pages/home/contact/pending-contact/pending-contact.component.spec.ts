import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingContactComponent } from './pending-contact.component';

describe('PendingContactComponent', () => {
  let component: PendingContactComponent;
  let fixture: ComponentFixture<PendingContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
