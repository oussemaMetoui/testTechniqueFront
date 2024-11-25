import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Person from '../../interfaces/person';
import { PersonService } from '../../services/person.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchByCompanyComponent } from '../search-by-company/search-by-company.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    SearchByCompanyComponent,
  ],
})
export class PersonsComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  displayedColumns = ['name', 'age', 'jobs', 'details'];
  form: FormGroup;
  error: string | null = null;
  private $subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.$subscription = this.personService
      .getPersons()
      .subscribe((data) => (this.persons = data));
  }

  onSubmit(): void {
    console.log(this.persons);

    if (this.form.valid) {
      const { firstName, lastName, dateOfBirth } = this.form.value;

      const age = this.calculateAge(new Date(dateOfBirth));
      if (age > 150) {
        this.error = 'Age cannot exceed 150 years.';
        return;
      }

      this.error = null;
      const newPerson = { firstName, lastName, dateOfBirth };
      this.personService.addPerson(newPerson).subscribe((person) => {
        this.persons.push(person);
        this.form.reset();
      });
    }
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return m < 0 || (m === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age;
  }

  viewDetails(person: Person) {
    this.router.navigate(['/person-details', person.id]);
  }
}
