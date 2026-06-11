import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { FleetComponent } from './fleet.component';

const translocoTesting = TranslocoTestingModule.forRoot({ langs: { ro: {} }, translocoConfig: { defaultLang: 'ro' } });

describe('FleetComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetComponent, translocoTesting],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FleetComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(FleetComponent);
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
