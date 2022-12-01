import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  constructor (private router: Router) {}
  
  ngOnInit(): void {}

  goToBookList() {
    this.router.navigateByUrl('books/list');
  }

}
