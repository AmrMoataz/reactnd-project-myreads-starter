import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Search extends Component {

  static propTypes = {
    onUpdateBookInSerach: PropTypes.func.isRequired,
    shelfedBooks: PropTypes.array.isRequired
  }

  state = {
    books: [],
  }

  updateQuery = (query) => {
    const { shelfedBooks } = this.props;
    BooksAPI.search(query)
      .then((results) => {
        if (!results || results.error) {
          this.setState(() => ({
            books: []
          }))
        } else {
          results.map((book) => {
            book.shelf = 'none'
            shelfedBooks.map((sb) => {
              if (sb.id === book.id) {
                book.shelf = sb.shelf
              }
            })
            return book;
          })
          this.setState(() => ({
            books: results
          }))
        }
      })
  }

  updateBookInSerach = (book, value) => {
    const { onUpdateBookInSerach } = this.props;
    onUpdateBookInSerach(book, value);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        {this.state.books && this.state.books.length > 0 && !this.state.books.error ? (
          <div className="search-books-results">
            <ol className="books-grid">
              {
                this.state.books.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    onUpdateBook={this.updateBookInSerach} />
                ))
              }
            </ol>
          </div>
        ) : (<h3 className='search-books-empty'>Can't find any book</h3>)}
      </div>
    )
  }
}

export default Search;