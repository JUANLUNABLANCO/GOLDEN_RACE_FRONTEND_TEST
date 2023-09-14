import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have "stop" as the engine button state', () => {
    service.getEngineButtonState().subscribe((state) => {
      expect(state).toBe('stop');
    });
  });

  it('should start the timer and change the engine button state to "init"', () => {
    service.startTimer();
    service.getEngineButtonState().subscribe((state) => {
      expect(state).toBe('init');
    });
  });

  it('should stop the timer and change the engine button state to "stop"', () => {
    service.stopTimer();
    service.getEngineButtonState().subscribe((state) => {
      expect(state).toBe('stop');
    });
  });

  // it('should emit timer values', fakeAsync(() => {
  //   const expectedValues = [1, 2, 3, 4, 5 ];
  //   const receivedValues: number[] = [];
  //   const subscription = service.getTimerValues().subscribe((value) => {
  //     receivedValues.push(value);
  //   });

  //   // Start the timer (fakeAsync)
  //   service.startTimer();
    
  //   // Advance the virtual timer by 1 second (1000 milliseconds)
  //   tick(1000);
  //   // Advance the virtual timer by another 1 second
  //   tick(1000);
  //   // Advance the virtual timer by 1 second (1000 milliseconds)
  //   tick(1000);
  //   // Advance the virtual timer by another 1 second
  //   tick(1000);
  //   // Advance the virtual timer by another 1 second
  //   tick(1000);
  //   // ... Repeat as needed to reach the expectedValues length
    
  //   // Check if receivedValues matches the expectedValues
  //   expect(receivedValues).toEqual(expectedValues);

  //   subscription.unsubscribe();
  // }));
});

