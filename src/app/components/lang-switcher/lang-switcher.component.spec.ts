import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { LangSwitcherComponent } from './lang-switcher.component';

function setup() {
  return TestBed.configureTestingModule({
    imports: [
      LangSwitcherComponent,
      TranslocoTestingModule.forRoot({
        langs: { ro: {}, en: {}, de: {}, fr: {}, es: {}, hu: {}, it: {}, nl: {} },
        translocoConfig: { defaultLang: 'ro', availableLangs: ['ro', 'en', 'de', 'fr', 'es', 'hu', 'it', 'nl'] }
      })
    ]
  });
}

describe('LangSwitcherComponent', () => {
  let fixture: ComponentFixture<LangSwitcherComponent>;
  let component: LangSwitcherComponent;

  beforeEach(async () => {
    setup();
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(LangSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with dropdown closed', () => {
    const inst = component as unknown as { open: () => boolean };
    expect(inst.open()).toBe(false);
  });

  it('should toggle dropdown open on trigger click', () => {
    const trigger = fixture.nativeElement.querySelector('.lang-trigger') as HTMLButtonElement;
    const inst = component as unknown as { open: () => boolean };
    trigger.click();
    fixture.detectChanges();
    expect(inst.open()).toBe(true);
  });

  it('should close dropdown when clicking outside', () => {
    const inst = component as unknown as { open: () => boolean; toggle: () => void };
    inst.toggle();
    fixture.detectChanges();
    expect(inst.open()).toBe(true);

    const outsideClick = new MouseEvent('click', { bubbles: true });
    document.body.dispatchEvent(outsideClick);
    fixture.detectChanges();
    expect(inst.open()).toBe(false);
  });

  it('should switch language and close dropdown on select', () => {
    const inst = component as unknown as {
      open: () => boolean;
      toggle: () => void;
      select: (lang: string) => void;
      activeLang: () => string;
    };
    inst.toggle();
    fixture.detectChanges();
    inst.select('en');
    fixture.detectChanges();
    expect(inst.activeLang()).toBe('en');
    expect(inst.open()).toBe(false);
  });

  it('should list all 8 languages with flag codes', () => {
    const inst = component as unknown as { langs: { code: string; flagCode: string }[] };
    expect(inst.langs.length).toBe(8);
    expect(inst.langs.every(l => l.flagCode.length > 0)).toBeTrue();
  });

  it('should render pills layout when variant is pills', async () => {
    const pillsFixture = TestBed.createComponent(LangSwitcherComponent);
    pillsFixture.componentRef.setInput('variant', 'pills');
    pillsFixture.detectChanges();
    const pills = pillsFixture.nativeElement.querySelectorAll('.lang-pill');
    expect(pills.length).toBe(8);
  });
});
