import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroViewComponent } from './retro-view.component';

describe('RetroViewComponent', () => {
  let component: RetroViewComponent;
  let fixture: ComponentFixture<RetroViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
