import { TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TranslocoTestingModule } from '@jsverse/transloco';
import emailjs from '@emailjs/browser';
import { ContactContentBlockComponent } from './contact-content-block.component';

const translocoTesting = TranslocoTestingModule.forRoot({
  langs: { ro: { 'contact.success_msg': 'Succes!', 'contact.error_msg': 'Eroare!' } },
  translocoConfig: { defaultLang: 'ro' },
});
const BLOCK = { formHeading: 'Contact Us', commercialTitle: 'Commercial' };

describe('ContactContentBlockComponent', () => {
  beforeEach(async () => {
    spyOn(emailjs, 'init').and.stub();
    spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' }));

    await TestBed.configureTestingModule({
      imports: [ContactContentBlockComponent, translocoTesting],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

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
    flushMicrotasks();
    tick(5000);
    expect(inst.submitMessage()).toBeNull();
  }));

  it('shows error message when emailjs rejects', fakeAsync(() => {
    (emailjs.send as jasmine.Spy).and.returnValue(Promise.reject(new Error('network')));
    const fixture = TestBed.createComponent(ContactContentBlockComponent);
    const inst = fixture.componentInstance as unknown as {
      isSubmitting: () => boolean;
      submitMessage: () => { type: string } | null;
      submitForm: () => void;
    };
    inst.submitForm();
    flushMicrotasks();
    expect(inst.isSubmitting()).toBeFalse();
    expect(inst.submitMessage()?.type).toBe('error');
  }));
});
