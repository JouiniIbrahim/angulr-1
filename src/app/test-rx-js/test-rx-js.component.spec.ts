import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRxJSComponent } from './test-rx-js.component';

describe('TestRxJSComponent', () => {
  let component: TestRxJSComponent;
  let fixture: ComponentFixture<TestRxJSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRxJSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRxJSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
