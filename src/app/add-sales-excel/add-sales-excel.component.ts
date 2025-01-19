import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { SalesViewModel } from '../Models/SalesModel';

interface DataRow {
  [key: string]: any;
}

@Component({
  selector: 'app-add-sales-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-sales-excel.component.html',
  styleUrl: './add-sales-excel.component.css'
})
export class AddSalesExcelComponent {
  parsedData: Array<SalesViewModel> = [];

  constructor(private webapi: ApiService) {

  }

  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      console.error('Cannot upload multiple files.');
      return;
    }

    const file: File = target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const binaryData = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryData, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data: Array<SalesViewModel> = XLSX.utils.sheet_to_json(worksheet);

      // Perform validation
      if (this.validateData(data)) {        
        this.parsedData = data;
        this.resetFileInput();
      } else {
        this.resetFileInput();
        this.parsedData = [];
      }
    };

    reader.readAsBinaryString(file);
  }

  // Validate data
  validateData(data: DataRow[]): boolean {
    if (!data.length) {
      alert('The uploaded file is empty.');
      return false;
    }

    const requiredFields = ['Title', 'ISBN', 'OrderId', 'Channel', 'Date', 'Status', 'MRP', 'Quantity', 'Royalty'];

    // Validate required columns
    const missingFields = requiredFields.filter(field => !(field in data[0]));
    if (missingFields.length > 0) {
      alert(`The uploaded file is missing the following columns: ${missingFields.join(', ')}`);
      return false;
    }

    const errors: string[] = [];
    data.forEach((row, index) => {
      // Check for empty fields in each row
      for (const field of requiredFields) {
        if (!row[field] || row[field].toString().trim() === '') {
          errors.push(`Row ${index + 2}: "${field}" cannot be empty.`);
        }
      }

      // ISBN Validation: Must be exactly 13 digits
      if (row['ISBN'] && !/^\d{13}$/.test(row['ISBN'].toString())) {
        errors.push(`Row ${index + 2}: ISBN "${row['ISBN']}" must be exactly 13 digits.`);
      }

      // MRP Validation: Must be a valid number
      if (row['MRP'] && isNaN(Number(row['MRP']))) {
        errors.push(`Row ${index + 2}: MRP "${row['MRP']}" must be a valid number.`);
      }

      // Royalty Validation: Must be a valid number
      if (row['Royalty'] && isNaN(Number(row['Royalty']))) {
        errors.push(`Row ${index + 2}: Royalty "${row['Royalty']}" must be a valid number.`);
      }

      // Date Validation: Must be a valid date
      if (row['Date']) {
        const date = new Date(row['Date']);
        if (isNaN(date.getTime())) {
          errors.push(`Row ${index + 2}: Date "${row['Date']}" is not a valid date.`);
        }
      } else {
        errors.push(`Row ${index + 2}: "Date" cannot be empty.`);
      }
    });

    // Display validation errors, if any
    if (errors.length > 0) {
      alert(`Validation Errors:\n${errors.join('\n')}`);
      return false;
    }

    return true; // Data is valid
  }

  // Submit data to API
  submitData(): void {
    this.parsedData.forEach(row => {
      row.ISBN = row.ISBN.toString();
    });
    let addBook = this.webapi.addSalesExcel(this.parsedData);
    addBook.subscribe((data: any) => {
      if (data.statusCode == 400) {
        Swal.fire({
          title: data.validation[0].title,
          text: data.validation[0].details,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
      else {
        Swal.fire({
          title: data.message,
          icon: "success"
        });
      }
    })
  }

  resetFileInput() {
    // Reset the file input element
    const fileInput = <HTMLInputElement>document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
