import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
