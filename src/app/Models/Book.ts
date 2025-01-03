export interface BookLocation {
  almirah: number;
  bed: number;
  box: number;
}

export interface Book {
  bookId: string;
  image: string; // Base64 encoded string
  title: string;
  author: string;
  isbn: string;
  locations: BookLocation;
  lastUpdatedOn: Date;
}