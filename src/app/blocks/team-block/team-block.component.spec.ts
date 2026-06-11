import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TeamBlockComponent } from './team-block.component';

const BLOCK = {
  heading: 'Our Team',
  body: 'Meet our experts.',
  highlights: [
    { _key: 'a', title: '15+', text: 'Years experience' },
    { _key: 'b', title: '8', text: 'Languages spoken' },
    { _key: 'c', title: '3', text: 'Offices' },
  ],
};

describe('TeamBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TeamBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(TeamBlockComponent);
    fixture.componentInstance.block = BLOCK;
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
