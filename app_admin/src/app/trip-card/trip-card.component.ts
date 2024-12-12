import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  @Input() trip!: Trip; // Use proper typing instead of `any`
  @Output() deleteRequested = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  editTrip(trip: Trip): void {
    // Store the trip code in localStorage
    localStorage.setItem('tripCode', trip.code);
    // Navigate to the edit-trip component
    this.router.navigate(['/edit-trip']);
  }

  onDeleteTrip(): void {
    // Emit the trip code so that the parent component can handle the actual deletion
    this.deleteRequested.emit(this.trip.code);
  }
}