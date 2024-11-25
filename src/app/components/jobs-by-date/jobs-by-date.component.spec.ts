import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsByDateComponent } from './jobs-by-date.component';

describe('JobsByDateComponent', () => {
  let component: JobsByDateComponent;
  let fixture: ComponentFixture<JobsByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsByDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
