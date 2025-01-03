export interface Dashboard {
    totalBooks_Distinct: number;            // Total distinct books
    totalBooks_Quantity: number;            // Total quantity of books
    booksInAlmirah_Distinct: number;        // Distinct books in the almirah
    booksInAlmirah_Quantity: number;        // Total quantity of books in the almirah
    booksInBed_Distinct: number;            // Distinct books in the bed
    booksInBed_Quantity: number;            // Total quantity of books in the bed
    booksInBox_Distinct: number;            // Distinct books in the box
    booksInBox_Quantity: number;            // Total quantity of books in the box
    books_OutofStock:number;                // Books that are out of stock
}