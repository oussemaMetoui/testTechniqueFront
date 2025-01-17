import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByCompanyComponent } from './search-by-company.component';

describe('SearchByCompanyComponent', () => {
  let component: SearchByCompanyComponent;
  let fixture: ComponentFixture<SearchByCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
