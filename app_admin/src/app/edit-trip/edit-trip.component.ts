import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something went wrong, tripCode is missing!");
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required]
    });

    // Fetch the trip data and populate the form
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (trip: Trip) => {
        this.trip = trip;
        this.editForm.patchValue(trip);
      },
      error: (error: any) => {
        console.error('Error fetching trip:', error);
        this.message = 'Error fetching trip data.';
      }
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (response: any) => {
          console.log('Trip updated:', response);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.error('Error updating trip:', error);
        }
      });
    }
  }

  // Quick access to form controls
  get f() {
    return this.editForm.controls;
  }
}
