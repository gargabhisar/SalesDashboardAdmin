export interface Book {
  bookId : string;
  title: string;
  iSBN: string;
  size: string;
  pages: number;
  pricePaperback: number;
  priceKindle: number;
  image: string;
  description: string;
  authorId: string;
}