import React from 'react'
import Book from './Book';
import PropTypes from 'prop-types'

const Shelf = (props) => {
  
  const bookShelfUpdate = (book, value) => {
    const { onBookShelfUpdate } = props;
    onBookShelfUpdate(book, value);
  }
  const { title, books } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((book) => (
              <Book
                key={book.id}
                book={book}
                onUpdateBook={bookShelfUpdate} />
            ))
          }
        </ol>
      </div>
    </div>
  )

}

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onBookShelfUpdate: PropTypes.func.isRequired
}

export default Shelf;