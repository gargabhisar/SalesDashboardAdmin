import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';
import { Author } from '../Models/Author';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private data: any = null;
  private base_url = "https://localhost:7203/";
  private publisherLogin_url = "Login/PublisherLogin";
  private addAuthor_url = "Author/AddAuthor";

  private getAllAuthors_url = "Author/GetAllAuthors";
  private getDasboard_url = "Dashboard/AdminDashboardDetails";

  constructor(private http: HttpClient) { }

  getToken() {
    let result = JSON.parse(sessionStorage.getItem('result') || '{}');
    return result.token;
  }

  getLoginDetails() {
    let result = JSON.parse(sessionStorage.getItem('result') || '{}');
    return result.loggedInUser;
  }

  login(logindetails: any) {
    let obs = this.http.post(this.base_url + this.publisherLogin_url, logindetails);
    return obs;
  }

  setData(value: any) {
    this.data = value;
  }

  getData() {
    return this.data;
  }

  clearData() {
    this.data = null;
  }

  getDashboardDetails() {
    let url = this.base_url + this.getDasboard_url;
    let obs = this.http.get<any>(url);
    return obs;
  }

  addAuthor(author: Author) {
    let obs = this.http.post(this.base_url + this.addAuthor_url, author);
    return obs;
  }

  getAllAuthors() {
    let obs = this.http.get<any>(this.base_url + this.getAllAuthors_url);
    return obs;
  }
}
