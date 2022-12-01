import { Component } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {

  book:any;

  constructor() {}

  ngOnInit(): void{
    this.book = JSON.parse(localStorage.getItem('selectedBook')!);
    console.log(this.book);

  }

  goToBuyLink() {
    window.open(this.book.buyLink);
  }


}
