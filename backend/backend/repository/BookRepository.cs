using backend.models;
using System.Xml.Linq;

namespace backend.repository
{
    public class BookRepository
    {
        public static List<BookModel> Books { get; } = new List<BookModel>();
        private static int _nextId = 1;
        public static BookModel AddBook(BookModel book)
        {
            book.Id = _nextId++;
            Books.Add(book);
            return book;
        }

        public static BookModel? GetBook(int id) => Books.FirstOrDefault(b => b.Id == id);

        public static void RemoveBook(int id)
        {
            var book = GetBook(id);
            if (book != null)
                Books.Remove(book);
        }

        public static void UpdateBook(int id, BookModel updated)
        {
            var book = GetBook(id);
            if (book != null)
            {
                book.Title = updated.Title;
                book.Author = updated.Author;
                book.ISBN = updated.ISBN;
                book.PublicationDate = updated.PublicationDate;
            }
        }
    }
}
