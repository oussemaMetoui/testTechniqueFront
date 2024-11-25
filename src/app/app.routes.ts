import { Routes } from '@angular/router';
import { PersonsComponent } from './components/persons/persons.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { JobsByDateComponent } from './components/jobs-by-date/jobs-by-date.component';
import { SearchByCompanyComponent } from './components/search-by-company/search-by-company.component';

export const routes: Routes = [
  { path: '', redirectTo: 'persons', pathMatch: 'full' },
  { path: 'company-search', component: SearchByCompanyComponent },
  { path: 'jobs-by-date', component: JobsByDateComponent },
  {
    path: 'persons',
    component: PersonsComponent,
  },
  { path: 'person-details/:id', component: PersonDetailsComponent },
];
