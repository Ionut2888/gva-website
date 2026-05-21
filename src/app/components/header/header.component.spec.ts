import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { HeaderComponent } from './header.component';

const translocoTesting = TranslocoTestingModule.forRoot({ langs: { ro: {} }, translocoConfig: { defaultLang: 'ro' } });

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, translocoTesting],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have menuOpen as false initially', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const instance = fixture.componentInstance as unknown as { menuOpen: () => boolean };
    expect(instance.menuOpen()).toBeFalse();
  });

  it('toggleMenu should open the menu', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const instance = fixture.componentInstance as unknown as {
      menuOpen: () => boolean;
      toggleMenu: () => void;
    };
    instance.toggleMenu();
    expect(instance.menuOpen()).toBeTrue();
  });

  it('toggleMenu twice should close the menu', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const instance = fixture.componentInstance as unknown as {
      menuOpen: () => boolean;
      toggleMenu: () => void;
    };
    instance.toggleMenu();
    instance.toggleMenu();
    expect(instance.menuOpen()).toBeFalse();
  });

  it('closeMenu should set menuOpen to false', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const instance = fixture.componentInstance as unknown as {
      menuOpen: () => boolean;
      toggleMenu: () => void;
      closeMenu: () => void;
    };
    instance.toggleMenu(); // open first
    instance.closeMenu();
    expect(instance.menuOpen()).toBeFalse();
  });

  it('should render the hamburger button', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.hamburger-btn')).toBeTruthy();
  });

  it('should render the CTA button', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.cta-btn')).toBeTruthy();
  });

  it('hamburger button click should toggle the menu', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const instance = fixture.componentInstance as unknown as { menuOpen: () => boolean };
    const btn = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.hamburger-btn')!;

    btn.click();
    fixture.detectChanges();
    expect(instance.menuOpen()).toBeTrue();

    btn.click();
    fixture.detectChanges();
    expect(instance.menuOpen()).toBeFalse();
  });
});
