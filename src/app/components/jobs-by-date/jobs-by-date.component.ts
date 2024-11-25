import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import Job from '../../interfaces/job';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import Person from '../../interfaces/person';

@Component({
  selector: 'app-jobs-by-date',
  templateUrl: './jobs-by-date.component.html',
  styleUrls: ['./jobs-by-date.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class JobsByDateComponent implements OnInit {
  form: FormGroup;
  jobs: Job[] = [];
  persons: Person[] = [];
  error: string | null = null;
  displayedColumns: string[] = [
    'companyName',
    'jobTitle',
    'startDate',
    'endDate',
  ];

  constructor(private fb: FormBuilder, private personService: PersonService) {
    this.form = this.fb.group({
      personId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personService.getPersons().subscribe(
      (persons) => {
        this.persons = persons;
      },
      (err) => {
        this.error = 'Unable to fetch the list of persons.';
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { personId, startDate, endDate } = this.form.value;
      this.fetchJobs(personId, startDate, endDate);
    } else {
      this.error = 'Please provide valid person ID and date range.';
    }
  }

  fetchJobs(personId: string, startDate: string, endDate: string): void {
    this.personService.getJobsByDate(personId, startDate, endDate).subscribe(
      (jobs) => {
        this.jobs = jobs;
        console.log(jobs);

        this.error = null;
      },
      (err) => {
        this.error =
          'Unable to fetch jobs for the given person and date range.';
        this.jobs = [];
      }
    );
  }
}
