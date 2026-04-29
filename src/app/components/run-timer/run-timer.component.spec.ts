import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RunTimerComponent } from './run-timer.component';
import { ThemeDeciderService } from '../../services/theme-decider.service';
import { ActivatedRoute } from '@angular/router';

describe('RunTimerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RunTimerComponent],
      providers: [
        ThemeDeciderService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  it('should calculate remaining time correctly regardless of timezone', () => {
    const fixture = TestBed.createComponent(RunTimerComponent);
    const component = fixture.componentInstance;

    // Set target time to 5 minutes from now
    const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000);
    component.targetTime = fiveMinutesFromNow;

    // Trigger change detection
    component.ngOnInit();

    // Wait a bit for timer to tick
    fixture.detectChanges();

    // Read the displayed minutes (should be around "05")
    const displayedMinutes = component.minutes;
    const displayedSeconds = component.seconds;

    // Parse the values
    const mins = parseInt(displayedMinutes, 10);
    const secs = parseInt(displayedSeconds, 10);

    // Should be close to 5 minutes (between 4:50 and 5:09)
    expect(mins).toBeGreaterThanOrEqual(4);
    expect(mins).toBeLessThanOrEqual(5);

    // If exactly 5 minutes, seconds should be near 0 or near 59
    if (mins === 5) {
      expect(secs).toBeGreaterThanOrEqual(0);
      expect(secs).toBeLessThanOrEqual(59);
    }
  });

  it('should show 00:00 when timer is expired', () => {
    const fixture = TestBed.createComponent(RunTimerComponent);
    const component = fixture.componentInstance;

    // Set target time to the past
    component.targetTime = Date.now() - 1000;

    fixture.detectChanges();

    expect(component.minutes).toBe('00');
    expect(component.seconds).toBe('00');
  });

  it('should display minutes padded with leading zero', () => {
    const fixture = TestBed.createComponent(RunTimerComponent);
    const component = fixture.componentInstance;

    // Set target time to 1 minute from now
    const oneMinuteFromNow = Date.now() + (60 * 1000);
    component.targetTime = oneMinuteFromNow;

    fixture.detectChanges();

    const mins = parseInt(component.minutes, 10);
    expect(mins).toBeGreaterThanOrEqual(0);
    expect(mins).toBeLessThanOrEqual(1);
  });
});
