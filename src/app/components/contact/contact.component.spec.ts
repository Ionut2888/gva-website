import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ContactComponent } from './contact.component';

const translocoTesting = TranslocoTestingModule.forRoot({ langs: { ro: {} }, translocoConfig: { defaultLang: 'ro' } });

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, translocoTesting],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
