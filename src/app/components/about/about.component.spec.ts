import { TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
