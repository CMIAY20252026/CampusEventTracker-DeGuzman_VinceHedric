import { Component, OnInit } from '@angular/core';
import { EventItem } from '../models/event-item';

@Component({
  selector: 'app-event-tracker',
  templateUrl: './event-tracker.component.html',
  styleUrls: ['./event-tracker.component.scss']
})
export class EventTrackerComponent implements OnInit {

  title: string = '';
  date: string = '';
  events: EventItem[] = [];

  ngOnInit(): void {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      this.events = JSON.parse(storedEvents);
    }
  }

  addEvent(): void {
    if (!this.title || !this.date) return;

    const newEvent: EventItem = {
      id: Date.now(),
      title: this.title,
      date: this.date
    };

    this.events.push(newEvent);
    this.updateLocalStorage();

    this.title = '';
    this.date = '';
  }

  deleteEvent(id: number): void {
    this.events = this.events.filter(event => event.id !== id);
    this.updateLocalStorage();
  }

  deleteAll(): void {
    this.events = [];
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    localStorage.setItem('events', JSON.stringify(this.events));
  }
}
