import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';
import { Author } from '../Models/Author';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private authorId: any = null;
  private bookId: any = null;
  private base_url = "https://localhost:7203/";
  private publisherLogin_url = "Login/PublisherLogin";

  private addAuthor_url = "Author/AddAuthor";
  private addBook_url = "Books/AddBook";
  private addSalesExcel_url = "Sales/AddSalesExcel";

  private updateAuthor_url = "Author/UpdateAuthor";
  private updateBook_url = "Books/UpdateBook";

  private getAllAuthors_url = "Author/GetAllAuthors";
  private getAllAuthorDetails_url = "Author/GetAllAuthorDetails";
  private getAuthorDetailsById_url = "Author/AuthorDetailsById";
  private getDasboard_url = "Dashboard/AdminDashboardDetails";
  private getAllBooks_url = "Books/GetAllBooks";
  private getBookDetailsByBookId_url = "Books/GetBookDetailsByBookId";  

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

  setAuthorId(value: any) {
    this.authorId = value;
  }

  getAuthorId() {
    return this.authorId;
  }

  setBookId(value: any) {
    this.bookId = value;
  }

  getBookId() {
    return this.bookId;
  }

  clearData() {
    this.authorId = null;
    this.bookId = null;
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

  getAllAuthorDetails() {
    let obs = this.http.get<any>(this.base_url + this.getAllAuthorDetails_url);
    return obs;
  }

  getAuthorDetailsById(authorID: string) {
    let obs = this.http.get<any>(this.base_url + this.getAuthorDetailsById_url + "?authorId=" + authorID);
    return obs;
  }

  updateAuthor(author: any) {
    let obs = this.http.post(this.base_url + this.updateAuthor_url, author);
    return obs;
  }

  addBook(book: Book) {
    let obs = this.http.post(this.base_url + this.addBook_url, book);
    return obs;
  }

  getAllBooks() {
    let obs = this.http.get<any>(this.base_url + this.getAllBooks_url);
    return obs;
  }

  getBookDetailsByBookId(bookId: string) {
    let obs = this.http.get<any>(this.base_url + this.getBookDetailsByBookId_url + "?BookId=" + bookId);
    return obs;
  }

  updateBook(formData: any) {
    let obs = this.http.post(this.base_url + this.updateBook_url, formData);
    return obs;
  }

  addSalesExcel(parsedData: any) {
    let obs = this.http.post(this.base_url + this.addSalesExcel_url, parsedData);
    return obs;
  }
}
