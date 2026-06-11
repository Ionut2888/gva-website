import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ValuesGridBlockComponent } from './values-grid-block.component';

const BLOCK = {
  heading: 'Our Values',
  values: [
    { _key: 'a', icon: 'verified', title: 'Trust', text: 'We are trustworthy.' },
    { _key: 'b', icon: 'speed', title: 'Speed', text: 'We are fast.' },
  ],
};

describe('ValuesGridBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValuesGridBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ValuesGridBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(ValuesGridBlockComponent);
    fixture.componentInstance.block = BLOCK;
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
