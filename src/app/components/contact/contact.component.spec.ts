import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(async () => {
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

    tick(7000); // drain all timers
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

    tick(7000); // one success, not two
    expect(instance.submitMessage()).toBeNull(); // message cleared after 5 s
  }));

  it('after 2 s isSubmitting should be false and a success message set', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    const instance = fixture.componentInstance as unknown as {
      isSubmitting: () => boolean;
      submitMessage: () => { type: string; text: string } | null;
      submitForm: () => void;
    };

    instance.submitForm();
    tick(2000);

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
    tick(2000);

    const data = instance.formData();
    expect(data['name']).toBe('');
    expect(data['email']).toBe('');
    expect(data['message']).toBe('');

    tick(5000); // drain cleanup timer
  }));

  it('success message should be cleared after 5 s', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    const instance = fixture.componentInstance as unknown as {
      submitMessage: () => unknown;
      submitForm: () => void;
    };

    instance.submitForm();
    tick(2000); // form submits
    tick(5000); // cleanup fires

    expect(instance.submitMessage()).toBeNull();
  }));
});
