import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-sales',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-sales.component.html',
  styleUrl: './book-sales.component.css'
})
export class BookSalesComponent {
  data = [
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "406-4669711-4286720",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "406-8388711-9487561",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 2,
      "Royalty": 64
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "407-0648466-4258760",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD225030899173532000",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD225023433767256000",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "404-3212594-9101128",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "171-8135181-1217152",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "171-3364824-5751509",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD224953406853719000",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "THE HIDDEN GEMS",
      "ISBN": "9789352063499",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "403-6577147-6588352",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 175,
      "Quantity": 1,
      "Royalty": 35
    },
    {
      "Title": "THE HIDDEN GEMS",
      "ISBN": "9789352063499",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD224929637031816000",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 175,
      "Quantity": 2,
      "Royalty": 70
    },
    {
      "Title": "THE HIDDEN GEMS",
      "ISBN": "9789352063499",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "407-9598429-9340336",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 175,
      "Quantity": 1,
      "Royalty": 35
    },
    {
      "Title": "Poison Ivy",
      "ISBN": "9788193998571",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "407-0648466-42587604",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 200,
      "Quantity": 1,
      "Royalty": 40
    },
    {
      "Title": "Poison Ivy",
      "ISBN": "9788193998571",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD225030899173532200",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 200,
      "Quantity": 2,
      "Royalty": 80
    },
    {
      "Title": "Poison Ivy",
      "ISBN": "9788193998571",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD225023433767256500",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 200,
      "Quantity": 2,
      "Royalty": 80
    },
    {
      "Title": "Poison Ivy",
      "ISBN": "9788193998571",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "404-3212594-910112840",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 200,
      "Quantity": 3,
      "Royalty": 120
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "406-4669711-4286721",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "406-8388711-9487562",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 2,
      "Royalty": 64
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "407-0648466-4258761",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD225030899173532001",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD225023433767256001",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "404-3212594-9101129",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "171-8135181-1217153",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "171-3364824-5751510",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD224953406853719001",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 199,
      "Quantity": 1,
      "Royalty": 32
    },
    {
      "Title": "THE HIDDEN GEMS",
      "ISBN": "9789352063499",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "403-6577147-6588353",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 175,
      "Quantity": 1,
      "Royalty": 35
    },
    {
      "Title": "THE HIDDEN GEMS",
      "ISBN": "9789352063499",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD224929637031816001",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 175,
      "Quantity": 2,
      "Royalty": 70
    },
    {
      "Title": "THE HIDDEN GEMS",
      "ISBN": "9789352063499",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "407-9598429-9340337",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 175,
      "Quantity": 1,
      "Royalty": 35
    },
    {
      "Title": "Poison Ivy",
      "ISBN": "9788193998571",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "407-0648466-42587605",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 200,
      "Quantity": 1,
      "Royalty": 40
    },
    {
      "Title": "Poison Ivy",
      "ISBN": "9788193998571",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD225030899173532201",
      "Channel": "Epitome",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 200,
      "Quantity": 2,
      "Royalty": 80
    },
    {
      "Title": "Poison Ivy",
      "ISBN": "9788193998571",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD225023433767256501",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 200,
      "Quantity": 2,
      "Royalty": 80
    },
    {
      "Title": "Poison Ivy",
      "ISBN": "9788193998571",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "404-3212594-910112841",
      "Channel": "Manipal",
      "Status": "Dispatched/JOB_DOCKET_GENERATED",
      "MRP": 200,
      "Quantity": 3,
      "Royalty": 120
    },
    {
      "Title": "The Girl with Dimples",
      "ISBN": "9788194563631",
      "PublicationName": "InkQuills Publishing House",
      "OrderId": "OD225023433767256000",
      "Channel": "Epitome",
      "Status": "Returned",
      "MRP": 199,
      "Quantity": -1,
      "Royalty": -32
    }
  ];

  displayedData = [...this.data];
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
      this.displayedData = this.data.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    } else {
      // If less than 2 characters, reset to show all data
      this.displayedData = [...this.data];
    }
  }

  sortTable(key: 'Title' | 'ISBN' | 'PublicationName' | 'OrderId' | 'Channel' | 'Status' | 'MRP' | 'Quantity' | 'Royalty') {
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
}