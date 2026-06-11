import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ServicesGridBlockComponent } from './services-grid-block.component';

const BLOCK = {
  heading: 'Our Services',
  cards: [
    { _key: 'a', icon: 'directions_car', title: 'Import', description: 'We import cars.' },
    { _key: 'b', icon: 'local_shipping', title: 'Export', description: 'We export cars.' },
  ],
};

describe('ServicesGridBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesGridBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ServicesGridBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(ServicesGridBlockComponent);
    fixture.componentInstance.block = BLOCK;
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
