import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { StoryBlockComponent } from './story-block.component';

const BLOCK = {
  heading: 'Our Story',
  paragraphs: ['We started in 2010.', 'Today we serve Europe.'],
  imageSrc: '/assets/story.jpg',
  imageAlt: 'Our team',
};

describe('StoryBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StoryBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render without errors', () => {
    const fixture = TestBed.createComponent(StoryBlockComponent);
    fixture.componentInstance.block = BLOCK;
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
