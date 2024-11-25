import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Person from '../../interfaces/person';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person.service';
import Job from '../../interfaces/job';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-person-details',
  standalone: true,
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
  imports: [
    CommonModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class PersonDetailsComponent implements OnInit {
  person?: Person;
  jobs: Job[] = [];
  jobForm: FormGroup;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private fb: FormBuilder
  ) {
    this.jobForm = this.fb.group({
      companyName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null],
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { person: Person };
    this.person = state?.person;
    const personId = this.route.snapshot.paramMap.get('id');

    if (personId) {
      this.getPerson(personId.toString());
    }
  }

  getPerson(personId: string) {
    this.personService
      .getPersonById(personId)
      .subscribe((data) => (this.person = data));
  }

  addJob() {
    if (this.jobForm.valid && this.person?.id) {
      const personId = this.route.snapshot.paramMap.get('id');
      if (personId) {
        const newJob: Job = this.jobForm.value;
        this.personService.addJob(personId.toString(), newJob).subscribe(
          (updatedPerson) => {
            // Add new job to the existing job list and clear the form
            this.jobs.push(...updatedPerson.jobs);
            this.jobForm.reset();
          },
          (error) => {
            this.error = 'Failed to add the job. Please try again.';
          }
        );
      } else {
        this.error = 'Please fill in all the required fields.';
      }
    }
  }
}
