import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingViewComponent } from './closing-view.component';

describe('ClosingViewComponent', () => {
  let component: ClosingViewComponent;
  let fixture: ComponentFixture<ClosingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
