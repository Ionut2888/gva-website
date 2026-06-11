import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ProcessStepsBlockComponent } from './process-steps-block.component';

const BLOCK = {
  heading: 'How it works',
  steps: [
    { _key: '1', number: '01', title: 'Request', text: 'Submit your request.' },
    { _key: '2', number: '02', title: 'Source', text: 'We find your car.' },
    { _key: '3', number: '03', title: 'Deliver', text: 'We deliver it.' },
    { _key: '4', number: '04', title: 'Done', text: 'You enjoy the car.' },
  ],
};

describe('ProcessStepsBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessStepsBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProcessStepsBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(ProcessStepsBlockComponent);
    fixture.componentInstance.block = BLOCK;
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
