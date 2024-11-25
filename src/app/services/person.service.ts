import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Person from '../interfaces/person';
import Job from '../interfaces/job';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly API_URL = 'https://localhost:7259/api/';

  constructor(private http: HttpClient) {}

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.API_URL}Person`);
  }

  addPerson(person: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }): Observable<Person> {
    return this.http.post<Person>(`${this.API_URL}Person`, person);
  }

  getPersonById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}Person/${id}`);
  }

  addJob(personId: string, job: Job): Observable<Person> {
    return this.http.post<Person>(`${this.API_URL}Job/${personId}`, job);
  }

  getPersonsByCompany(companyName: string): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.API_URL}Job/company/${companyName}`);
  }

  getJobsByDate(
    personId: string,
    start: string,
    end: string
  ): Observable<Job[]> {
    return this.http.get<Job[]>(
      `${this.API_URL}Person/${personId}/jobs?startDate=${start}&endDate=${end}`
    );
  }
}
