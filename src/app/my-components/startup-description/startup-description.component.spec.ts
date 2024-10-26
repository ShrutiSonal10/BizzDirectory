import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupDescriptionComponent } from './startup-description.component';

describe('StartupDescriptionComponent', () => {
  let component: StartupDescriptionComponent;
  let fixture: ComponentFixture<StartupDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartupDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
