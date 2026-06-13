import { TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ContactContentBlockComponent } from './contact-content-block.component';

const translocoTesting = TranslocoTestingModule.forRoot({
  langs: { ro: { 'contact.success_msg': 'Succes!', 'contact.error_msg': 'Eroare!' } },
  translocoConfig: { defaultLang: 'ro' },
});
const BLOCK = { formHeading: 'Contact Us', commercialTitle: 'Commercial' };

describe('ContactContentBlockComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactContentBlockComponent, translocoTesting],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactContentBlockComponent);
    fixture.componentInstance.block = BLOCK;
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('isSubmitting starts false', () => {
    const fixture = TestBed.createComponent(ContactContentBlockComponent);
    const inst = fixture.componentInstance as unknown as { isSubmitting: () => boolean };
    expect(inst.isSubmitting()).toBeFalse();
  });

  it('submitMessage starts null', () => {
    const fixture = TestBed.createComponent(ContactContentBlockComponent);
    const inst = fixture.componentInstance as unknown as { submitMessage: () => unknown };
    expect(inst.submitMessage()).toBeNull();
  });

  it('submitForm sets isSubmitting to true immediately', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactContentBlockComponent);
    const inst = fixture.componentInstance as unknown as {
      isSubmitting: () => boolean;
      submitForm: () => void;
    };
    inst.submitForm();
    expect(inst.isSubmitting()).toBeTrue();
    httpMock.expectOne(r => r.url.includes('contactForm')).flush({});
    flushMicrotasks();
    tick(5000);
  }));

  it('after send resolves: isSubmitting false, success message shown', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactContentBlockComponent);
    const inst = fixture.componentInstance as unknown as {
      isSubmitting: () => boolean;
      submitMessage: () => { type: string; text: string } | null;
      submitForm: () => void;
    };
    inst.submitForm();
    httpMock.expectOne(r => r.url.includes('contactForm')).flush({});
    flushMicrotasks();
    expect(inst.isSubmitting()).toBeFalse();
    expect(inst.submitMessage()?.type).toBe('success');
    tick(5000);
  }));

  it('success message clears after 5 s', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactContentBlockComponent);
    const inst = fixture.componentInstance as unknown as {
      submitMessage: () => unknown;
      submitForm: () => void;
    };
    inst.submitForm();
    httpMock.expectOne(r => r.url.includes('contactForm')).flush({});
    flushMicrotasks();
    tick(5000);
    expect(inst.submitMessage()).toBeNull();
  }));

  it('shows error message when request fails', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactContentBlockComponent);
    const inst = fixture.componentInstance as unknown as {
      isSubmitting: () => boolean;
      submitMessage: () => { type: string } | null;
      submitForm: () => void;
    };
    inst.submitForm();
    httpMock.expectOne(r => r.url.includes('contactForm')).error(new ProgressEvent('network'));
    flushMicrotasks();
    expect(inst.isSubmitting()).toBeFalse();
    expect(inst.submitMessage()?.type).toBe('error');
  }));
});
