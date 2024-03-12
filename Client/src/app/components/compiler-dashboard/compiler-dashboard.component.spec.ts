import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilerDashboardComponent } from './compiler-dashboard.component';

describe('CompilerDashboardComponent', () => {
  let component: CompilerDashboardComponent;
  let fixture: ComponentFixture<CompilerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompilerDashboardComponent]
    });
    fixture = TestBed.createComponent(CompilerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
