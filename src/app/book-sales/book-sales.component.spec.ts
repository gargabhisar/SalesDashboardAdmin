import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSalesComponent } from './book-sales.component';

describe('BookSalesComponent', () => {
  let component: BookSalesComponent;
  let fixture: ComponentFixture<BookSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
