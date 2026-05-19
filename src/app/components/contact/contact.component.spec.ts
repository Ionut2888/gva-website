import { TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import emailjs from '@emailjs/browser';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(async () => {
    // Prevent real EmailJS initialisation and network calls
    spyOn(emailjs, 'init').and.stub();
    spyOn(emailjs, 'send').and.returnValue(
      Promise.resolve({ status: 200, text: 'OK' })
    );

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialise isSubmitting as false', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const instance = fixture.componentInstance as unknown as { isSubmitting: () => boolean };
    expect(instance.isSubmitting()).toBeFalse();
  });

  it('should initialise submitMessage as null', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const instance = fixture.componentInstance as unknown as {
      submitMessage: () => unknown;
    };
    expect(instance.submitMessage()).toBeNull();
  });

  it('submitForm should set isSubmitting to true immediately', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    const instance = fixture.componentInstance as unknown as {
      isSubmitting: () => boolean;
      submitForm: () => void;
    };

    instance.submitForm();
    expect(instance.isSubmitting()).toBeTrue();

    flushMicrotasks(); // resolve the emailjs.send promise
    tick(5000);        // drain the cleanup timer
  }));

  it('submitForm should be a no-op while already submitting', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    const instance = fixture.componentInstance as unknown as {
      isSubmitting: () => boolean;
      submitForm: () => void;
      submitMessage: () => unknown;
    };

    instance.submitForm(); // first call
    instance.submitForm(); // second call — must be ignored
    expect(instance.isSubmitting()).toBeTrue();

    flushMicrotasks();
    tick(5000);
    expect(instance.submitMessage()).toBeNull(); // message cleared after 5 s
  }));

  it('after send resolves isSubmitting should be false and a success message set', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    const instance = fixture.componentInstance as unknown as {
      isSubmitting: () => boolean;
      submitMessage: () => { type: string; text: string } | null;
      submitForm: () => void;
    };

    instance.submitForm();
    flushMicrotasks(); // emailjs.send promise resolves

    expect(instance.isSubmitting()).toBeFalse();
    expect(instance.submitMessage()).toBeTruthy();
    expect(instance.submitMessage()?.type).toBe('success');

    tick(5000); // drain the cleanup timer
  }));

  it('should reset formData after successful submission', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    const instance = fixture.componentInstance as unknown as {
      formData: () => Record<string, string>;
      submitForm: () => void;
    };

    instance.submitForm();
    flushMicrotasks();

    const data = instance.formData();
    expect(data['name']).toBe('');
    expect(data['email']).toBe('');
    expect(data['message']).toBe('');

    tick(5000);
  }));

  it('success message should be cleared after 5 s', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    const instance = fixture.componentInstance as unknown as {
      submitMessage: () => unknown;
      submitForm: () => void;
    };

    instance.submitForm();
    flushMicrotasks(); // success message set
    tick(5000);        // cleanup fires

    expect(instance.submitMessage()).toBeNull();
  }));

  it('should show error message when emailjs.send rejects', fakeAsync(() => {
    (emailjs.send as jasmine.Spy).and.returnValue(Promise.reject(new Error('network error')));

    const fixture = TestBed.createComponent(ContactComponent);
    const instance = fixture.componentInstance as unknown as {
      isSubmitting: () => boolean;
      submitMessage: () => { type: string; text: string } | null;
      submitForm: () => void;
    };

    instance.submitForm();
    flushMicrotasks();

    expect(instance.isSubmitting()).toBeFalse();
    expect(instance.submitMessage()?.type).toBe('error');
  }));
});
