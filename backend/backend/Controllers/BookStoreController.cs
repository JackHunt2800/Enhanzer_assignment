using backend.models;
using backend.repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookStoreController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll() => Ok(BookRepository.Books);

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var book = BookRepository.GetBook(id);
            return book == null ? NotFound() : Ok(book);
        }

        [HttpPost]
        public IActionResult Create([FromBody] BookModel book)
        {
            var created = BookRepository.AddBook(book);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] BookModel updatedBook)
        {
            var existing = BookRepository.GetBook(id);
            if (existing == null) return NotFound();
            BookRepository.UpdateBook(id, updatedBook);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var book = BookRepository.GetBook(id);
            if (book == null) return NotFound();
            BookRepository.RemoveBook(id);
            return NoContent();
        }
    }
}
