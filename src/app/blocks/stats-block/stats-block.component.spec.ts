import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { StatsBlockComponent } from './stats-block.component';

const BLOCK = {
  items: [
    { _key: 'a', value: '500+', label: 'Cars' },
    { _key: 'b', value: '10', label: 'Years' },
    { _key: 'c', value: '8', label: 'Countries' },
    { _key: 'd', value: '98%', label: 'Satisfaction' },
  ],
};

describe('StatsBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StatsBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all stat items', () => {
    const fixture = TestBed.createComponent(StatsBlockComponent);
    fixture.componentInstance.block = BLOCK;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('.stat-item').length).toBe(4);
  });

  it('should display stat values and labels', () => {
    const fixture = TestBed.createComponent(StatsBlockComponent);
    fixture.componentInstance.block = BLOCK;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('500+');
    expect(el.textContent).toContain('Cars');
  });
});
