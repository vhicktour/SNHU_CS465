import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Method to navigate to the Edit Trip page
  editTrip(trip: any): void {
    // Store the trip code in localStorage
    localStorage.setItem('tripCode', trip.code);
    // Navigate to the edit-trip component
    this.router.navigate(['/edit-trip']);
  }
}
