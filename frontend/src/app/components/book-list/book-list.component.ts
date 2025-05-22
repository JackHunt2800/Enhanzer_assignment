import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  bookForm!: FormGroup;
  editingBook: Book | null = null;

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadBooks();
    this.initForm();
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.pattern(/^[0-9\-]+$/)]],
      publicationDate: ['', Validators.required]
    });
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    const newBook = this.bookForm.value;
    this.bookService.addBook(newBook).subscribe(() => {
      this.loadBooks();
      this.bookForm.reset();
    });
  }

  editBook(book: Book): void {
    this.editingBook = { ...book };
    this.bookForm.setValue({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationDate: book.publicationDate
    });
  }

  updateBook(): void {
    if (this.editingBook?.id && this.bookForm.valid) {
      this.bookService.updateBook(this.editingBook.id, this.bookForm.value).subscribe(() => {
        this.editingBook = null;
        this.bookForm.reset();
        this.loadBooks();
      });
    }
  }

  cancelEdit(): void {
    this.editingBook = null;
    this.bookForm.reset();
  }

  deleteBook(id?: number): void {
    if (id) {
      this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
    }
  }
}
