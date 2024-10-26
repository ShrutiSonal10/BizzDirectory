import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupCarouselComponent } from './startup-carousel.component';

describe('StartupCarouselComponent', () => {
  let component: StartupCarouselComponent;
  let fixture: ComponentFixture<StartupCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartupCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
