import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { EfficiencyBlockComponent } from './efficiency-block.component';

const BLOCK = {
  eyebrow: 'Why us',
  heading: 'Maximum efficiency',
  body: 'We deliver results.',
  items: [
    { _key: 'a', strong: 'Fast', text: 'Delivery in days' },
    { _key: 'b', strong: 'Safe', text: 'Insured transport' },
  ],
  cta: 'Learn more',
  ctaLink: '/services',
};

describe('EfficiencyBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfficiencyBlockComponent],
      providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EfficiencyBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(EfficiencyBlockComponent);
    fixture.componentInstance.block = BLOCK;
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
