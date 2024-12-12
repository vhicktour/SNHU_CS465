import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent], 
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService],
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  // Injecting Router in the constructor
  constructor(
    private tripDataService: TripDataService,
    private router: Router // Added Router injection
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
  
  public onDelete(tripCode: string): void {
    this.tripDataService.deleteTrip(tripCode).subscribe(() => {
      console.log(`Trip with code ${tripCode} deleted successfully.`);
      this.getStuff(); // Refresh the list of trips after deletion
    });
  }

  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        if (value.length > 0) {
          this.message = `There are ${value.length} trips available.`;
        } else {
          this.message = 'There were no trips retrieved from the database.';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      },
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
