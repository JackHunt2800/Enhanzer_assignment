import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BookListComponent } from './components/book-list/book-list.component';

@Component({
  selector: 'app-root',
  imports: [BookListComponent],
  template: `<app-book-list/>`
})
export class AppComponent {
  title = 'Book Manager';
}
