import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
  
})
export class BookCardComponent {
  // @Input() title ='this is a card';
  // @Input() description ='khxhdbahxbxh dbhxakd bxxxxxxxxxxxxxd xbhsak DJabdibhsa casjdbshbx axhsaa x';
  // @Input() author ='';
  // @Input() price ='';

  @Input() book: Book = {
    title:'Harry Potter',
    description: `The Shibu Inu is the smallest of the breeds of dog from Japan. A small, agile dog that `,
    author: 'J.K. Rowling',
    price: 100,
    buyLink: '',
    imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  };

  @Output() cardClicked = new EventEmitter();
  
  constructor() {}

  ngOnInit(): void {}


  goToBuyLink() {
    window.open(this.book.buyLink);
  }

  onCardClicked() {
    this.cardClicked.emit();
  }
  
}
