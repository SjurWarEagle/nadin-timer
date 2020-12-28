import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NadinLogoComponent } from './nadin-logo.component';

describe('NadinLogoComponent', () => {
  let component: NadinLogoComponent;
  let fixture: ComponentFixture<NadinLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NadinLogoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NadinLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
