import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { BookDetailComponent } from "./book-detail/book-detail.component";
import { BookListComponent } from "./book-list/book-list.component";
import { BookComponent } from "./book/book.component";

const routes:Route[] = [
    {
        path:'',
        //pathMatch:'full',
        component: BookComponent,
        children: [
            {
                path:'',
                pathMatch:'full',
                redirectTo:'list',
            },
            {
                path:'list',
                component: BookListComponent,
            },
            {
                path:'detail',
                component: BookDetailComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class BookRoutingModule { }
  