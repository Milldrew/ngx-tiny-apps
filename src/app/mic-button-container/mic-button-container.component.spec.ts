import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicButtonContainerComponent } from './mic-button-container.component';

describe('MicButtonContainerComponent', () => {
  let component: MicButtonContainerComponent;
  let fixture: ComponentFixture<MicButtonContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicButtonContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicButtonContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
