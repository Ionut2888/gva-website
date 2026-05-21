import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { LegalComponent } from './legal.component';

function makeTestBed(page: 'terms' | 'privacy' | 'cookies') {
  return TestBed.configureTestingModule({
    imports: [
      LegalComponent,
      TranslocoTestingModule.forRoot({
        langs: { ro: {} },
        translocoConfig: { defaultLang: 'ro' }
      })
    ],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: { data: of({ page }) }
      }
    ]
  });
}

describe('LegalComponent — terms', () => {
  let fixture: ComponentFixture<LegalComponent>;

  beforeEach(async () => {
    makeTestBed('terms');
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(LegalComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose page signal as "terms"', () => {
    expect((fixture.componentInstance as unknown as { page: () => string }).page()).toBe('terms');
  });
});

describe('LegalComponent — privacy', () => {
  let fixture: ComponentFixture<LegalComponent>;

  beforeEach(async () => {
    makeTestBed('privacy');
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(LegalComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose page signal as "privacy"', () => {
    expect((fixture.componentInstance as unknown as { page: () => string }).page()).toBe('privacy');
  });
});

describe('LegalComponent — cookies', () => {
  let fixture: ComponentFixture<LegalComponent>;

  beforeEach(async () => {
    makeTestBed('cookies');
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(LegalComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose page signal as "cookies"', () => {
    expect((fixture.componentInstance as unknown as { page: () => string }).page()).toBe('cookies');
  });
});
