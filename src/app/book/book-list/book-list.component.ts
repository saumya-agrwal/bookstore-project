import { Component } from '@angular/core';
import { Book, BookCategory } from 'src/app/models';
import { BookModule } from '../book.module';
import { BookService } from '../book.service';
import {map, VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  //books = [1,2,3,4,5,6,7,8,9,10];

  bookCategories: BookCategory[] = [
  ];

  selectedBookCategory: any;

  // books: Book[] = [
  //   {
  //   title:'Harry Potter',
  //   description: `The Shibu Inu is the smallest of the breeds of dog from Japan. A small, agile dog that `,
  //   author: 'J.K. Rowling',
  //   price: 100,
  //   buyLink: 'https://angular.io/',
  //   imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //   },
  //   {
  //     title:'Harry Potter',
  //     description: `The Shibu Inu is the smallest of the breeds of dog from Japan. A small, agile dog that `,
  //     author: 'J.K. Rowling',
  //     price: 100,
  //     buyLink: 'https://angular.io/',
  //     imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     },
  //     {
  //       title:'Harry Potter',
  //       description: `The Shibu Inu is the smallest of the breeds of dog from Japan. A small, agile dog that `,
  //       author: 'J.K. Rowling',
  //       price: 100,
  //       buyLink: 'https://angular.io/',
  //       imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //       }


  // ];

  books: Book[] =[];

  constructor(private bookService: BookService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchBookCategories();
  }

  fetchBookCategories() {
    this.bookService
      .getBookCategories()
      .pipe(
        map((response) => {
          console.log('response', response);
          return this.getTranformedCategories(response);
        })
      )  
      .subscribe({
        next: (categories: BookCategory[]) => { 
          console.log('transformed response', categories);
          this.bookCategories = categories;
          this.onCategorySelected(this.bookCategories[0]);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getTranformedCategories(categoryResponse: any): BookCategory[] {
    const tranformedCategories = categoryResponse.results.map(
      (category: any) => {
        const newCategory: BookCategory = {
          title: category.list_name,
          categoryId: category.list_name_encoded,
        };
        return newCategory;
      }
    );
    return tranformedCategories;
  }

  onCategorySelected(category: BookCategory) {
    this.selectedBookCategory = category;
    //console.log(this.selectedBookCategory);
    this.fetchBooksByCategory();
  }

  fetchBooksByCategory() {
    this.bookService
    .getBookByCategory(this.selectedBookCategory.categoryId)
    .pipe(
      map((response) => {
        return this.getTranformedBooks(response);
      })
    )  
    .subscribe({
      next: (books) => {
        console.log(books);
        this.books=books;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getTranformedBooks(booksResponse: any): Book[] {
    return booksResponse.results.books.map((book: any) => {
      const newBook: Book = {
        title: book.title,
        description: book.description,
        author: book.author,
        price: Number(book.price),
        buyLink: book.amazon_product_url,
        imageUrl: book.book_image,
        
      };
      return newBook;

    });
  }  

  goToBookDetailView(book:Book) {
    console.log('selectedBook', book);
    localStorage.setItem('selectedBook', JSON.stringify(book));

    // ../detail/12345 or [..],['detail],[12345]
    this.router.navigate(['../detail'], {relativeTo: this.activatedRoute,})
  }
}