import { Component, output } from '@angular/core';
import { PersonService } from '../../services/person.service'; // Adjust the import path
import Person from '../../interfaces/person';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-by-company',
  templateUrl: './search-by-company.component.html',
  styleUrls: ['./search-by-company.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatInputModule,
  ],
})
export class SearchByCompanyComponent {
  companyName: string = '';
  persons: Person[] = [];
  error: string | null = null;

  constructor(private personService: PersonService) {}

  searchByCompany() {
    if (this.companyName.trim()) {
      this.personService.getPersonsByCompany(this.companyName).subscribe(
        (persons) => {
          this.persons = persons;

          this.error = null;
        },
        (err) => {
          this.error = 'No persons found for the given company.';
          this.persons = [];
        }
      );
    } else {
      this.error = 'Please enter a valid company name.';
      this.persons = [];
    }
  }
}
