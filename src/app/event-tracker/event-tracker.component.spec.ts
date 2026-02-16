import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventTrackerComponent } from './event-tracker.component';
import { EventItem } from '../models/event-item';

describe('EventTrackerComponent', () => {
  let component: EventTrackerComponent;
  let fixture: ComponentFixture<EventTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventTrackerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EventTrackerComponent);
    component = fixture.componentInstance;

    // Clear localStorage before each test
    localStorage.clear();

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new event', () => {
    component.title = 'Angular Conference';
    component.date = '2026-02-14';
    component.addEvent();

    expect(component.events.length).toBe(1);
    expect(component.events[0].title).toBe('Angular Conference');
    expect(component.title).toBe('');
    expect(component.date).toBe('');
  });

  it('should not add an event if title or date is missing', () => {
    component.title = '';
    component.date = '2026-02-14';
    component.addEvent();

    expect(component.events.length).toBe(0);

    component.title = 'Angular Conference';
    component.date = '';
    component.addEvent();

    expect(component.events.length).toBe(0);
  });

  it('should delete an event by id', () => {
    const event: EventItem = { id: 1, title: 'Event 1', date: '2026-02-14' };
    component.events.push(event);

    component.deleteEvent(1);
    expect(component.events.length).toBe(0);
  });

  it('should delete all events', () => {
    component.events.push({ id: 1, title: 'Event 1', date: '2026-02-14' });
    component.events.push({ id: 2, title: 'Event 2', date: '2026-02-15' });

    component.deleteAll();
    expect(component.events.length).toBe(0);
  });

  it('should load events from localStorage on init', () => {
    const storedEvents: EventItem[] = [
      { id: 123, title: 'Stored Event', date: '2026-02-14' }
    ];
    localStorage.setItem('events', JSON.stringify(storedEvents));

    component.ngOnInit();
    expect(component.events.length).toBe(1);
    expect(component.events[0].title).toBe('Stored Event');
  });

  it('should assign a valid id when adding an event', () => {
    component.title = 'Test Event';
    component.date = '2026-02-14';
    component.addEvent();

    const newEvent = component.events[0];
    expect(newEvent.id).toBeDefined();
    expect(typeof newEvent.id).toBe('number');
  });
});
