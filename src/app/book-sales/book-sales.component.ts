import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { SalesModel } from '../Models/SalesModel';

@Component({
  selector: 'app-book-sales',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-sales.component.html',
  styleUrl: './book-sales.component.css'
})
export class BookSalesComponent {
  salesdata: Array<SalesModel> = [];

  displayedData = [...this.salesdata];
  searchTerm = '';
  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 10;

  get totalPages(): number {
    return Math.ceil(this.displayedData.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  filterTable() {
    if (this.searchTerm.length >= 2) {
      this.currentPage = 1;
      this.displayedData = this.salesdata.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    } else {
      // If less than 2 characters, reset to show all data
      this.displayedData = [...this.salesdata];
    }
  }

  sortTable(key: 'title' | 'isbn' | 'orderId' | 'channel' | 'status' | 'mrp' | 'quantity' | 'royalty' | 'date') {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.displayedData.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortClass(key: string): string {
    if (this.sortKey === key) {
      return this.sortDirection === 'asc' ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
    }
    return 'fa fa-arrow';
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get displayedDataForPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.displayedData.slice(startIndex, startIndex + this.pageSize);
  }

  constructor(private webapi: ApiService) {
    this.webapi.getAllSalesForPublisher().subscribe({
      next: (data: any) => {
        if (data.statusCode == 400) {
          Swal.fire({
            title: data.validation[0].title,
            text: data.validation[0].details,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
        else {
          this.salesdata = data.result
          this.displayedData = data.result; // Save all data from API response
        }
      }
    });
  }
}