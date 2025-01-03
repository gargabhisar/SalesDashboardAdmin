import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Dashboard } from '../Models/Dashboard';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBed, faWarehouse, faBook, faCircleXmark, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  faBed = faBed;
  faWarehouse = faWarehouse;
  fabook = faBook;
  faCircleXmark = faCircleXmark;
  faBoxArchive= faBoxArchive;

  dashboardDetails: Dashboard | null = null;

  constructor(private webapi: ApiService) {
    this.webapi.getDashboardDetails().subscribe({
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
          this.dashboardDetails = data.result;
        }
      }
    });
  }
}
