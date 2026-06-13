import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let titleSpy: jasmine.SpyObj<Title>;
  let metaSpy: jasmine.SpyObj<Meta>;

  beforeEach(async () => {
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    metaSpy = jasmine.createSpyObj('Meta', ['updateTag']);
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        provideRouter([]),
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NotFoundComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the 404 code and a home link', () => {
    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.nf-code')?.textContent).toContain('404');
    expect(el.querySelector('a.nf-btn')?.getAttribute('href')).toBe('/home');
  });

  it('sets the title and a noindex robots tag', () => {
    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
    expect(titleSpy.setTitle).toHaveBeenCalledWith('404 — Pagina nu a fost găsită');
    expect(metaSpy.updateTag).toHaveBeenCalledWith({ name: 'robots', content: 'noindex, follow' });
  });
});
