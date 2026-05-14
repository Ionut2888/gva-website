import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose currentYear equal to the current year', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const instance = fixture.componentInstance as unknown as { currentYear: number };
    expect(instance.currentYear).toBe(new Date().getFullYear());
  });

  it('should render the copyright notice with the current year', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain(String(new Date().getFullYear()));
    expect(text).toContain('GVA Verkaufer');
  });

  it('should render the company email link', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const emailLink = el.querySelector<HTMLAnchorElement>('a[href="mailto:auto@gvaverkaufer.ro"]');
    expect(emailLink).toBeTruthy();
  });

  it('should render the phone link', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const phoneLink = el.querySelector<HTMLAnchorElement>('a[href="tel:+40745852977"]');
    expect(phoneLink).toBeTruthy();
  });
});
