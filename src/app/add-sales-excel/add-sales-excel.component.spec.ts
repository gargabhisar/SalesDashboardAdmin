import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesExcelComponent } from './add-sales-excel.component';

describe('AddSalesExcelComponent', () => {
  let component: AddSalesExcelComponent;
  let fixture: ComponentFixture<AddSalesExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSalesExcelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalesExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
