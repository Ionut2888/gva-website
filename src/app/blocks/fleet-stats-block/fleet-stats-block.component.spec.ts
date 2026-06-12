import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { FleetStatsBlockComponent } from './fleet-stats-block.component';

const BLOCK = {
  stats: [
    { _key: 'a', icon: 'directions_car', value: '500+', label: 'Vehicles' },
    { _key: 'b', icon: 'flag', value: '20+', label: 'Brands' },
    { _key: 'c', icon: 'star', value: '10', label: 'Years' },
    { _key: 'd', icon: 'public', value: '8', label: 'Countries' },
  ],
};

describe('FleetStatsBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetStatsBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FleetStatsBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(FleetStatsBlockComponent);
    fixture.componentInstance.block = BLOCK;
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
