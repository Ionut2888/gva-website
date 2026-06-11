import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { FleetFeaturesBlockComponent } from './fleet-features-block.component';

const BLOCK = {
  heading: 'Fleet Features',
  features: [
    { _key: 'a', icon: 'verified', title: 'Inspected', text: 'All cars inspected.' },
    { _key: 'b', icon: 'local_shipping', title: 'Delivered', text: 'Door-to-door delivery.' },
  ],
};

describe('FleetFeaturesBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetFeaturesBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FleetFeaturesBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(FleetFeaturesBlockComponent);
    fixture.componentInstance.block = BLOCK;
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
