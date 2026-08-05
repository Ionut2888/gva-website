import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TimelineBlockComponent } from './timeline-block.component';

const BLOCK = {
  heading: 'Povestea Noastră',
  subtitle: 'O evoluție constantă.',
  items: [
    { _key: 'a', year: '2018', title: 'Fundația', text: 'Înființată cu o viziune clară.' },
    { _key: 'b', year: '2020', title: 'Expansiunea Flotei', text: 'Primele camioane Scania R450.' },
    { _key: 'c', year: 'Prezent', title: 'Parteneriat de Încredere', text: 'Un pilon în logistica auto B2B.' },
  ],
};

describe('TimelineBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TimelineBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders heading and all timeline entries', () => {
    const fixture = TestBed.createComponent(TimelineBlockComponent);
    fixture.componentInstance.block = BLOCK;
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Povestea Noastră');
    expect(el.querySelectorAll('.timeline-block__item').length).toBe(3);
    expect(el.textContent).toContain('Scania R450');
  });

  it('renders the year label for each entry', () => {
    const fixture = TestBed.createComponent(TimelineBlockComponent);
    fixture.componentInstance.block = BLOCK;
    fixture.detectChanges();
    const years = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.timeline-block__year'),
    ).map((e) => e.textContent?.trim());
    expect(years).toEqual(['2018', '2020', 'Prezent']);
  });
});
