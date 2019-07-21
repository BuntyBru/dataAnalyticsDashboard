import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EChartsComponent } from './e-charts.component';

describe('EChartsComponent', () => {
  let component: EChartsComponent;
  let fixture: ComponentFixture<EChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
