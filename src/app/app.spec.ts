import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { SeoService } from './services/seo.service';

describe('App', () => {
  let seoSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    seoSpy = jasmine.createSpyObj('SeoService', ['init']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: SeoService, useValue: seoSpy },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call seo.init() on ngOnInit', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(seoSpy.init).toHaveBeenCalledOnceWith();
  });

  it('should render a router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render the header', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-header')).toBeTruthy();
  });

  it('should render the footer', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-footer')).toBeTruthy();
  });
});
