import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadricLayoutComponent } from './quadric-layout.component';

describe('QuadricLayoutComponent', () => {
  let component: QuadricLayoutComponent;
  let fixture: ComponentFixture<QuadricLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadricLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadricLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
