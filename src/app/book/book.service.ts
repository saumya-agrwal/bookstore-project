import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  /** 
   * Gets all book categories
   * @returns Observable<Object> 
  */
  getBookCategories(): Observable<Object>{
    const GET_CATEGORIES_URL ='https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=xAgu377bqbbjkoIrEgU23tyfbMGvs4x9';
    return this.http.get(GET_CATEGORIES_URL);

  }

  /**
   * Get bestselling books by category
   * @param categoryName: category name for which you want the books
   * @param date: date for which you want the books 'YYYY-MM-DD | current'
   * @returns Observble<Object>
   */
  getBookByCategory(categoryName: string, date = 'current'): Observable<Object>{
    const GET_BOOKS_BY_CATEGORY_URL =`https://api.nytimes.com/svc/books/v3/lists/${date}/${categoryName}.json?api-key=xAgu377bqbbjkoIrEgU23tyfbMGvs4x9`;
    return this.http.get(GET_BOOKS_BY_CATEGORY_URL);

  }
}
